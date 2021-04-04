/** Configures the rules governing how commit messages may be formatted. */
module.exports = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed.
   */
  extends: ['@commitlint/config-conventional'],

  /**
   * Defines what commit messages should look like;
   * one line is usually fine using the following format:
   * <type>(<scope>): <subject> where types are defined below.
   *
   */
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'fix', // patches a bug in your codebase (correlates with PATCH in Semantic Versioning)
        'feat', // introduces a new feature to the codebase (this correlates with MINOR in Semantic Versioning)
        'build', // affects the build system or external dependencies (example scopes: npm, yarn)
        'chore', // changes to auxiliary tools such as release scripts
        'ci', // affects the Continuous Integration system (aka CI) via changes to config files or scripts
        'docs', // affects only documentation (example scopes: code comments, readme files)
        'perf', // improves performance
        'refactor', // neither fixes a bug nor adds a feature yet still improves the code
        'revert', // reverts a previous commit
        'style', // affects the appearance but not the meaning of the code (white-space, formatting, missing semi-colons ...)
        'test', // adds missing tests or corrects existing tests
      ],
    ],
  },
}
