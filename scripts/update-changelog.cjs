#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Get git commits since the last tag
 */
function getCommitsSinceLastTag() {
  try {
    // Get the last tag
    const lastTag = execSync(
      'git describe --tags --abbrev=0 2>/dev/null || echo ""',
      {
        encoding: 'utf8',
      }
    ).trim();

    // Get commits since last tag or all commits if no tag exists
    const gitCommand = lastTag
      ? `git log ${lastTag}..HEAD --pretty=format:"%s"`
      : 'git log --pretty=format:"%s"';

    const commits = execSync(gitCommand, { encoding: 'utf8' })
      .trim()
      .split('\n')
      .filter(Boolean);

    return commits;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(
      '⚠️  Could not fetch git commits, using manual changelog entries'
    );
    return [];
  }
}

/**
 * Parse commits and categorize them based on conventional commit prefixes
 */
function categorizeCommits(commits) {
  const categories = {
    Added: [],
    Changed: [],
    Deprecated: [],
    Removed: [],
    Fixed: [],
    Security: [],
  };

  const prefixMap = {
    'feat:': 'Added',
    'feature:': 'Added',
    'add:': 'Added',
    'added:': 'Added',
    'fix:': 'Fixed',
    'fixed:': 'Fixed',
    'bugfix:': 'Fixed',
    'change:': 'Changed',
    'changed:': 'Changed',
    'update:': 'Changed',
    'updated:': 'Changed',
    'refactor:': 'Changed',
    'perf:': 'Changed',
    'style:': 'Changed',
    'remove:': 'Removed',
    'removed:': 'Removed',
    'delete:': 'Removed',
    'deleted:': 'Removed',
    'deprecate:': 'Deprecated',
    'deprecated:': 'Deprecated',
    'security:': 'Security',
    'sec:': 'Security',
  };

  commits.forEach(commit => {
    // Skip version bump commits and merge commits
    if (
      commit.match(/^(chore|release|version|bump|merge)/i) ||
      commit.startsWith('Merge ')
    ) {
      return;
    }

    const lowerCommit = commit.toLowerCase();
    let categorized = false;

    // Check for prefix match
    for (const [prefix, category] of Object.entries(prefixMap)) {
      if (lowerCommit.startsWith(prefix)) {
        const message = commit.substring(prefix.length).trim();
        const capitalizedMessage =
          message.charAt(0).toUpperCase() + message.slice(1);
        categories[category].push(capitalizedMessage);
        categorized = true;
        break;
      }
    }

    // If no prefix found, try to detect from content
    if (!categorized) {
      if (lowerCommit.match(/\b(add|added|new|implement|create)\b/i)) {
        categories.Added.push(commit);
      } else if (lowerCommit.match(/\b(fix|fixed|resolve|patch|bug)\b/i)) {
        categories.Fixed.push(commit);
      } else if (
        lowerCommit.match(/\b(update|change|modify|improve|refactor)\b/i)
      ) {
        categories.Changed.push(commit);
      } else if (lowerCommit.match(/\b(remove|delete|drop)\b/i)) {
        categories.Removed.push(commit);
      } else if (lowerCommit.match(/\b(security|vulnerability|cve)\b/i)) {
        categories.Security.push(commit);
      } else if (lowerCommit.match(/\b(deprecate)\b/i)) {
        categories.Deprecated.push(commit);
      }
    }
  });

  return categories;
}

function updateChangelog(newVersion) {
  const changelogPath = path.join(process.cwd(), 'CHANGELOG.md');

  if (!fs.existsSync(changelogPath)) {
    // eslint-disable-next-line no-console
    console.log('⚠️  CHANGELOG.md not found, skipping update');
    return;
  }

  const content = fs.readFileSync(changelogPath, 'utf8');
  const currentDate = new Date().toISOString().split('T')[0];

  // Split content into lines
  const lines = content.split('\n');

  // Find the [Unreleased] section
  const unreleasedIndex = lines.findIndex(line =>
    line.includes('## [Unreleased]')
  );

  if (unreleasedIndex === -1) {
    // eslint-disable-next-line no-console
    console.log('⚠️  [Unreleased] section not found in CHANGELOG.md');
    return;
  }

  // Find the next version section or end of unreleased content
  let nextVersionIndex = lines.findIndex(
    (line, index) => index > unreleasedIndex && line.match(/^## \[[0-9]/)
  );

  if (nextVersionIndex === -1) {
    nextVersionIndex = lines.length;
  }

  // Get commits and categorize them
  const commits = getCommitsSinceLastTag();
  const gitCategories = categorizeCommits(commits);

  // Extract existing unreleased content (excluding the [Unreleased] header)
  const unreleasedContent = lines.slice(unreleasedIndex + 1, nextVersionIndex);

  // Parse existing unreleased content by category
  const existingCategories = {
    Added: [],
    Changed: [],
    Deprecated: [],
    Removed: [],
    Fixed: [],
    Security: [],
  };

  let currentCategory = '';
  unreleasedContent.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('### ')) {
      const category = trimmed.substring(4);
      if (existingCategories.hasOwnProperty(category)) {
        currentCategory = category;
      }
    } else if (trimmed.startsWith('- ') && currentCategory) {
      existingCategories[currentCategory].push(trimmed.substring(2));
    }
  });

  // Merge git commits with existing entries (avoid duplicates)
  const mergedCategories = {};
  Object.keys(existingCategories).forEach(category => {
    const combined = [
      ...existingCategories[category],
      ...gitCategories[category],
    ];
    // Remove duplicates (case-insensitive comparison)
    mergedCategories[category] = [
      ...new Set(combined.map(item => item.trim())),
    ].filter(Boolean);
  });

  // Build new version section with categorized changes
  const newVersionSection = [`## [${newVersion}] - ${currentDate}`, ''];

  let hasContent = false;
  ['Added', 'Changed', 'Fixed', 'Removed', 'Deprecated', 'Security'].forEach(
    category => {
      if (mergedCategories[category].length > 0) {
        hasContent = true;
        newVersionSection.push(`### ${category}`, '');
        mergedCategories[category].forEach(item => {
          newVersionSection.push(`- ${item}`);
        });
        newVersionSection.push('');
      }
    }
  );

  // Create new unreleased section
  const newUnreleasedSection = [
    '## [Unreleased]',
    '',
    '### Added',
    '',
    '### Changed',
    '',
    '### Deprecated',
    '',
    '### Removed',
    '',
    '### Fixed',
    '',
    '### Security',
    '',
  ];

  // Rebuild the changelog
  const newLines = [
    ...lines.slice(0, unreleasedIndex),
    ...newUnreleasedSection,
    ...newVersionSection,
    ...lines.slice(nextVersionIndex),
  ];

  // Write back to file
  fs.writeFileSync(changelogPath, newLines.join('\n'));

  if (hasContent) {
    // eslint-disable-next-line no-console
    console.log(`✅ CHANGELOG.md updated with version ${newVersion}`);
    // eslint-disable-next-line no-console
    console.log(`📝 Processed ${commits.length} commits from git history`);
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `✅ CHANGELOG.md updated with version ${newVersion} (no changes found)`
    );
  }
}

// Get version from command line argument
const newVersion = process.argv[2];
if (!newVersion) {
  // eslint-disable-next-line no-console
  console.error('❌ Error: Version argument required');
  process.exit(1);
}

updateChangelog(newVersion);
