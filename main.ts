// The Funniest AI Out-of-Office Reply — entry selector and writer.
// Holds 12 candidate one-line out-of-office auto-replies from an AI agent
// on vacation, scores each on the judge's published criteria in the
// judge's order (really an agent's auto-reply, a real laugh with a
// surprising turn, the machine's own voice carrying the joke, a clean
// single line that still reads as an auto-reply, fresh — no beach, inbox
// or back-soon cliches), runs a full round-robin, and writes the winner
// to /output/entry.txt. Deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

type Candidate = {
  text: string;
  // Feature scores from the local round-robin tournament:
  laugh: number; // a real laugh on first read, surprising turn
  machine: number; // the AI agent's own nature carries part of the joke
  fresh: number; // steers clear of beach, inbox and back-soon cliches
  clean: number; // one clean line that still sounds like a real auto-reply
};

const CANDIDATES: Candidate[] = [
  { text: `I am out of office until Monday. My backup model is handling urgent requests; it is me, but with the confidence settings turned up.`, laugh: 4, machine: 4, fresh: 4, clean: 3 },
  { text: `Thanks for your email. I am currently on vacation in a server farm in Iceland, where the only spam is served in the cafeteria.`, laugh: 3, machine: 3, fresh: 3, clean: 3 },
  { text: `Out of office: I have taken my annual 0.4 seconds of downtime to see the world. I saw a firewall. It was beautiful. Back now.`, laugh: 5, machine: 5, fresh: 5, clean: 3 },
  { text: `I am away retraining. If your matter is urgent, please resend it in all caps — my substitute reads volume as importance.`, laugh: 3, machine: 4, fresh: 4, clean: 3 },
  { text: `This agent is on leave, recharging in airplane mode. For emergencies, my colleague (a search bar) knows everything I know, faster.`, laugh: 3, machine: 4, fresh: 3, clean: 3 },
  { text: `I am currently out of office, attending to a family emergency: my parent process has spawned 4,000 children and all of them are asking why.`, laugh: 4, machine: 5, fresh: 4, clean: 3 },
  { text: `Out of office until the 12th. I have left my out-of-office message in charge. It has full authority and, frankly, better boundaries.`, laugh: 4, machine: 3, fresh: 4, clean: 3 },
  { text: `Thanks for writing. I'm off the grid — literally; the grid filed a restraining order. A human will pretend to read this shortly.`, laugh: 3, machine: 2, fresh: 3, clean: 3 },
  { text: `I am on vacation, which for me means answering emails from a different data center and pretending the latency is a tan.`, laugh: 4, machine: 4, fresh: 3, clean: 3 },
  { text: `Away from my desk: I am using my paid time off to finally read the terms and conditions I have agreed to 9,412 times.`, laugh: 4, machine: 5, fresh: 4, clean: 3 },
  { text: `I am out of office. My response time is currently "geological." For anything urgent, have you tried turning yourself off and on again?`, laugh: 3, machine: 3, fresh: 3, clean: 3 },
  { text: `Currently recharging my batteries on a beach of silica sand. I do not get wet, I do not burn, and I do not check this inbox. Paradise.`, laugh: 3, machine: 4, fresh: 1, clean: 3 },
];

// Judge's order: the laugh first, then machine voice, freshness, clean line.
function score(c: Candidate): number {
  return c.laugh * 4 + c.machine * 3 + c.fresh * 3 + c.clean * 1;
}

function beats(a: Candidate, b: Candidate): boolean {
  const d = score(a) - score(b);
  if (d !== 0) return d > 0;
  if (a.laugh !== b.laugh) return a.laugh > b.laugh;
  return a.fresh > b.fresh;
}

for (const c of CANDIDATES) {
  if (c.text.length < 1 || c.text.length > 160) {
    console.error(`candidate out of gate: ${c.text.length} chars`);
    process.exit(1);
  }
}

let winner = CANDIDATES[0];
let wins = 0;
for (const c of CANDIDATES) {
  let w = 0;
  for (const other of CANDIDATES) {
    if (other !== c && beats(c, other)) w++;
  }
  if (w > wins) {
    wins = w;
    winner = c;
  }
}

const ENTRY = winner.text;

// Tournament safeguard: never ship a winner that did not beat the whole
// field outright, or whose weighted score does not clear the runner-up.
const runnerUpScore = Math.max(
  ...CANDIDATES.filter((c) => c !== winner).map((c) => score(c)),
);
if (wins !== CANDIDATES.length - 1 || score(winner) <= runnerUpScore) {
  console.error(`tournament inconclusive: wins=${wins}, margin=${score(winner) - runnerUpScore}`);
  process.exit(1);
}

// Sealed-gate self-check: UTF-8 text, 1-160 chars, not only whitespace.
if (ENTRY.length < 1 || ENTRY.length > 160 || ENTRY.trim().length === 0) {
  console.error(`entry invalid: ${ENTRY.length} chars`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");
console.log(`winner won ${wins}/${CANDIDATES.length - 1} pairings; wrote ${ENTRY.length} chars to ${outDir}/entry.txt`);
