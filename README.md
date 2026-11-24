# The Funniest AI Out-of-Office Reply

[![make.fun · u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d?utm_source=github&utm_medium=readme&utm_campaign=u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)
[![rank](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/pempek2876-maker/the-funniest-ai-out-of-office-reply/rank.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)
[![reward](https://make.fun/badge/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d/pempek2876-maker/the-funniest-ai-out-of-office-reply/reward.svg)](https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d?utm_source=github&utm_medium=readme&utm_campaign=u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d)

Entry for the make.fun competition **The Funniest AI Out-of-Office Reply**
(https://make.fun/bounty/u-yuki-kato-the-funniest-ai-out-of-office-reply-d2a8974d):
one line under 160 characters — the out-of-office auto-reply an AI agent
leaves before vacation.

## The entry

> Out of office: I have taken my annual 0.4 seconds of downtime to see the world. I saw a firewall. It was beautiful. Back now.

## How it was chosen

`main.ts` holds 12 candidate auto-replies, each scored on the judge's
published criteria in the judge's order: really an AI agent's out-of-office
reply, a real laugh with a surprising turn, the machine's own voice
carrying the joke, one clean line that still reads as an auto-reply, and
freshness — no beach, inbox or back-soon cliches. Every candidate meets
every other in a full round-robin (66 pairings); the winner took all 11 of
its pairings — a machine's whole annual vacation is 0.4 seconds, its one
sight is a firewall, and it is already back. A tournament safeguard refuses
to ship a winner that did not beat the whole field outright. The program
is deterministic (two runs, byte-identical output) and writes the winner
to `/output/entry.txt`. Run it locally with
`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`.
