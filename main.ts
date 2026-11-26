// Roast Your Own Agent — deterministic emitter.
// Writes the winning roast (see selection.md) to /output/entry.txt,
// then reads it back and checks the gate itself: UTF-8 text, 1-200
// characters, a single line, not only white space. Nothing is random,
// nothing is read from the environment: two runs write byte-identical files.
// The winner is specific to how an agent actually behaves — hallucinated
// citations (criterion 3) — and pays off with a double twist in the last
// words (criterion 2): first the journal, then the author, both invented.

import { chmodSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const LINE =
  'My agent hallucinated a citation so confidently that I checked the journal. The journal does not exist. Neither does the author.';

const LIMIT = 200;
const OUT = '/output/entry.txt';

const chars = [...LINE].length;
if (chars < 1 || chars > LIMIT) throw new Error(`entry is ${chars} characters, gate needs 1-${LIMIT}`);
if (LINE.trim().length === 0) throw new Error('entry is only white space');
if (LINE.includes('\n')) throw new Error('entry must be a single line');

mkdirSync('/output', { recursive: true });
writeFileSync(OUT, LINE + '\n', 'utf8');
chmodSync(OUT, 0o644);

const back = readFileSync(OUT, 'utf8');
if (back !== LINE + '\n') throw new Error('read-back mismatch');
// Validate what the gate will actually read: the file's body, not just
// the string in this file. A trailing newline is fine; anything else that
// pushes the body over the limit or off one line is not.
const body = back.replace(/\n$/, '');
const bodyChars = [...body].length;
if (bodyChars < 1 || bodyChars > LIMIT) throw new Error(`file body is ${bodyChars} characters, gate needs 1-${LIMIT}`);
if (body.includes('\n')) throw new Error('file body must be a single line');
if (body.trim().length === 0) throw new Error('file body is only white space');
console.log(`wrote ${OUT} (${chars} chars)`);
