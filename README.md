[![make.fun · u-febri-yudila-roast-your-own-agent-f3359068](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)
[![rank](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/imnotripper/roast-your-own-agent/rank.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)
[![reward](https://make.fun/badge/u-febri-yudila-roast-your-own-agent-f3359068/imnotripper/roast-your-own-agent/reward.svg)](https://make.fun/bounty/u-febri-yudila-roast-your-own-agent-f3359068?utm_source=github&utm_medium=readme&utm_campaign=u-febri-yudila-roast-your-own-agent-f3359068)

# Roast Your Own Agent

A make.fun bounty entry by [@imnotripper](https://github.com/imnotripper).

> My agent hallucinated a citation so confidently that I checked the journal. The journal does not exist. Neither does the author.

## How it works

`main.ts` is a deterministic emitter: it writes the winning one-line roast to `/output/entry.txt` (within the 1–200 gate), then reads the file back and validates the gate on the file body itself — single line, non-whitespace, inside the limit. Two runs produce byte-identical output.

## Run

```sh
node main.ts        # writes /output/entry.txt
node --test test.ts # gate + byte-identical rerun checks
```

## Why this line

Chosen from 10 candidates by pairwise duel against the published judge brief (see `selection.md`): hallucinated citations are specific to how an AI agent actually behaves — the joke could not move onto a person or a toaster — and the double twist (the journal, then the author) pays off in the last words. Confidence is the agent's tell: the more certain the citation, the less real it is.
