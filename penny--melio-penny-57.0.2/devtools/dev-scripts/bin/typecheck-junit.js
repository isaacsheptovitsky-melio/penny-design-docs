#!/usr/bin/env node
/* eslint-disable no-console */
/**
 * I think this script is based on https://github.com/glenjamin/typescript-xunit-xml which converts tsc typecheck results to junit xml format.
 */

const readline = require('readline');
const xmlbuilder = require('xmlbuilder');
const fs = require('fs');
const path = require('path');
require('colors');
const { table, getBorderCharacters } = require('table');

async function main(input) {
  if (process.stdin.isTTY) {
    throw new Error('expected input to be piped in');
  }

  const parser = newParser();

  const rl = readline.createInterface({
    input,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    parser.parse(line);
  }

  const content = toJunit(parser.errors);

  const outputPath = path.resolve(
    `${process.env['INIT_CWD']}/.reports/${process.env['LERNA_PACKAGE_NAME']}/typecheck.xml`
  );
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, content);

  const output = formatOutputString(parser.errors);
  if (output) console.error(output);
  process.exit(output ? 1 : 0);
}

// We only handle the format without --pretty right now
const UGLY_REGEX = /^(?<file>.+?)\((?<line>\d+),(?<col>\d+)\): error (?<code>\S+?): (?<message>.+)$/;

function newParser() {
  const errors = {};
  function parse(line) {
    const match = UGLY_REGEX.exec(line);
    if (match) {
      const error = {
        ...match.groups,
        line: Number(match.groups.line),
        col: Number(match.groups.col),
      };
      if (!errors[error.file]) errors[error.file] = [];
      errors[error.file].push(error);
    }
  }
  return { errors, parse };
}

function toJunit(errors) {
  const obj = {
    testsuites: {
      testsuite: Object.entries(errors).map(([filename, errors]) => ({
        '@package': 'typecheck',
        '@name': filename,
        '@tests': errors.length,
        '@errors': errors.length,
        testcase: errors.map((err) => ({
          '@name': err.code,
          '@classname': err.file + ':' + err.line + ':' + err.col,
          failure: {
            '@message': err.message,
          },
        })),
      })),
    },
  };
  return xmlbuilder.create(obj).end({ pretty: true });
}

/**
 * This is to log the errors to the console as well.
 */
function formatOutputString(errors) {
  const numErrors = countErrors(errors);
  if (numErrors) {
    const lines = Object.entries(errors).reduce(
      (target, [filename, errors]) => [...target, filename, styleErrors(errors)],
      []
    );
    return [...lines, `✖ ${numErrors} problems (${numErrors} errors)`.red, ''].join('\n');
  }
  return '';
}

function countErrors(errors) {
  return Object.entries(errors).reduce((target, [, errors]) => errors.length + target, 0);
}

function styleErrors(errors) {
  return table(
    errors.map((error) => [`${error.line}:${error.col}`.gray, `error`.red, error.message, error.code.gray]),
    { border: getBorderCharacters('void'), drawHorizontalLine: () => false }
  );
}

if (require.main) {
  main(process.stdin).catch((err) => {
    console.error('ERROR: ' + err.message);
    process.exit(1);
  });
}
