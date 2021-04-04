/* eslint-disable prettier/prettier */

/**
 * To keep things simple there are a total of X different commit types allowed,
 * including one oughta be avoided in the interests of developer efficiency.
 * Multiple scopes with slash-or-comma separators are permitted;
 * these should refer to entities within the codebase and so it might be helpful
 * to simply use fragments of filepaths touched by the commit.
 */
const commitTypes = [
        'prang', // changes which are of absolutely no value whatsoever to a single-developer project:
                 // this includes writing unnecessary documentation for whom there is no other audience.

        /** Bugfixes are an important commit type and so will be included in the changelog. */
        'bugfix', // creates value by fixing a bug in the codebase
                  // (correlates with PATCH in Semantic Versioning)

        /** Features are an important commit type and so will be included in the changelog. */
        'feature', // creates value to the user by introducing a new feature of some sort
                   // (correlates with MINOR in Semantic Versioning)

        // The following categories are not so important and are also subject to change,
        // everything below was taken from https://commitlint.js.org/ initially then modified.

        'build', // affects the build system or external dependencies (example scopes: package.json, yarn, nuxt.config.js)
        'chore', // modify auxiliary tooling *without user value creation*
        'ci', // affects the Continuous Integration system (aka CI) via changes to config files or scripts
        'docs', // affects only documentation (example scopes: code comments, readme files)
        'perf', // improves performance
        'refactor', // neither fixes a bug nor adds a feature yet still improves the code
        'revert', // reverts a previous commit
        'style', // affects the appearance but not the meaning of the code (white-space, formatting, missing semi-colons ...)
        'test', // adds missing tests or corrects existing tests
      ]

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
      commitTypes,
    ],
  },
}
