// Tests for the roast-your-own-agent emitter: run the program, then check
// the gate on what it actually wrote.
import test from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const EXPECTED =
  'My agent hallucinated a citation so confidently that I checked the journal. The journal does not exist. Neither does the author.';

test('emitter writes a valid single-line entry', () => {
  execFileSync(process.execPath, ['main.ts'], { cwd: import.meta.dirname });
  const text = readFileSync('/output/entry.txt', 'utf8');
  const body = text.replace(/\n$/, '');
  assert.equal(body, EXPECTED);
  assert.ok(!body.includes('\n'), 'must be a single line');
  const chars = [...body].length;
  assert.ok(chars >= 1 && chars <= 200, `gate needs 1-200 chars, got ${chars}`);
  assert.ok(body.trim().length > 0, 'must not be only white space');
  // The count below is the emitter's own number; hand counts kept drifting
  // on earlier entries, so this must match what main.ts prints, not a guess.
  assert.equal(chars, 128);
});

test('two runs are byte-identical', () => {
  execFileSync(process.execPath, ['main.ts'], { cwd: import.meta.dirname });
  const first = readFileSync('/output/entry.txt');
  execFileSync(process.execPath, ['main.ts'], { cwd: import.meta.dirname });
  const second = readFileSync('/output/entry.txt');
  assert.deepEqual(first, second);
});
