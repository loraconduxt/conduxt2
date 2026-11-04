// Scripted coach answers: a = answer (first sentence = takeaway, **bold** = key phrase), r = recommendations.
window.COACH = (() => {
  const A = {
    // Today
    'Why do I go quiet under pressure?': { a:'Quiet is how you concentrate — you’re re-mapping the system before you speak. The risk is that others read it as distance, so **name it in the moment** before the silence does the talking.', r:['Say “I’m going heads-down, not checking out — back to you by 3.”','Give one sentence of where you are, even if unfinished.','Book a 10-minute check-in after the crunch so nobody’s left guessing.'] },
    'How do I prep for my 2pm with Sam?': { a:'Sam thinks out loud; you think first. Open by **saying where you’ve landed and how you got there**, then pause and let Sam react before you defend it.', r:['Write your conclusion in one line before the call.','Ask “What do you see that I don’t?” in the first five minutes.','Close by agreeing when the decision is due and who owns it.'] },
    'What should I protect this week?': { a:'Your mornings. Your best thinking happens early and uninterrupted, and that’s the first thing a busy week takes — **block two 90-minute windows now**, before anyone else claims them.', r:['Put the blocks in your calendar as “Deep work — decisions”.','Move status meetings after 1pm.','Turn Slack to away until 10:30 on those days.'] },
    // Collaborate
    'How do I bring a skeptic in early?': { a:'Show the skeptic the system before the solution. When they see how you mapped it, **they critique the map, not you**, and their pushback becomes useful input instead of a late veto.', r:['Share a rough draft labelled “30% — break it”.','Ask them for the one risk you’re not seeing.','Credit their catch in the next update.'] },
    'Where do I over-own the plan?': { a:'You over-own when you’ve already seen the whole picture and others haven’t. **Hand over the parts, not just the tasks** — give each person a piece of the system they can shape.', r:['List three decisions you could let someone else make this week.','Ask “How would you do this?” before you explain how you would.','Review outcomes, not steps.'] },
    'What do others need from me?': { a:'Mostly, they need to see your thinking earlier. You arrive with conclusions; **people want the route, not just the destination**, so they can trust it and add to it.', r:['Share one “here’s how I’m thinking” note mid-week.','Ask each person what would make their week easier.','Make your priorities visible in one shared doc.'] },
    // Create
    'When am I at my best?': { a:'Early, alone and uninterrupted — that’s when your systems thinking connects the pieces fastest. **Treat your first two hours as your most valuable asset** and guard them like a meeting with your CEO.', r:['Do the hardest problem before opening email.','Keep a “parking lot” note for ideas that interrupt you.','Save collaborative sessions for late morning, once the thinking is done.'] },
    'How do I stop over-structuring?': { a:'Structure is how you feel safe with complexity, but too much of it closes ideas before they’ve had air. **Set a timer for messy thinking** before you let yourself build the framework.', r:['Spend 20 minutes on ideas with no headings or bullets.','Ask “What’s the version with half the structure?”','Share rough work earlier than feels comfortable.'] },
    'What breaks my focus most?': { a:'Context switching — especially reactive messages that pull you out of the system you’re holding in your head. **Batch your replies** so the map doesn’t have to be rebuilt every time.', r:['Check messages at three set times a day.','Close every tab not related to the current problem.','Tell your team how to reach you for genuine urgencies.'] },
    // Communicate
    'How do I land a hard message?': { a:'Lead with the conclusion, then show your working — that’s your natural strength. **Add one line about what it means for them** before you move on, so the message lands as care, not just clarity.', r:['Write the message in three lines: decision, reason, impact on them.','Say it in person or on a call, not in a thread.','Ask “What’s your first reaction?” and then stop talking.'] },
    'Why do people miss my point?': { a:'You skip steps you’ve already seen, so people hear the conclusion without the bridge. **Say the one step in between out loud** — it feels obvious to you and it isn’t to them.', r:['Use “Because…, so…” in every key point.','Draw the system on a whiteboard or slide.','Ask someone to play it back in their own words.'] },
    'How should I open the meeting?': { a:'Open with the purpose and the decision you need, in one sentence. **People relax when they know what done looks like**, and you get to the substance faster.', r:['Say “By the end of this we need to decide X.”','Give a 30-second context, not a recap.','Invite the quietest person to go first.'] },
    // Confront
    'What do I do when I shut down?': { a:'Shutting down is your way of protecting clear thinking, not avoiding the person. **Ask for time out loud** so the pause reads as respect rather than withdrawal.', r:['Say “I want to answer this well — can I come back to you in an hour?”','Write down what triggered the shutdown.','Return with one question, not a full rebuttal.'] },
    'How do I repair after tension?': { a:'Go first, and keep it short. **A two-line acknowledgment within a day** does more than a long conversation a week later.', r:['Message: “That got tense — I want to understand your side.”','Name one thing you’d do differently.','Agree one small next step together.'] },
    'What does the other person need?': { a:'Usually, to feel heard before they feel solved. You move to the system fix quickly; **reflect their point back first** and the fix will land better.', r:['Say “So what matters most to you is…” before proposing anything.','Ask what a good outcome looks like for them.','Leave one decision in their hands.'] },
    // Claim
    'Where does my confidence come from?': { a:'From seeing the whole picture — your confidence is grounded in understanding, not volume. **Show the map you’ve built** and the room will follow your clarity.', r:['Lead with “Here’s what I’m seeing across the system.”','Keep a list of calls you got right early.','Ask for the room when you’ve done the thinking, not before.'] },
    'How do I own the room?': { a:'You own it with purpose, not presence. **State why this matters in the first minute**, then let the structure of your thinking carry the rest.', r:['Stand or sit at the front when you open.','Use one visual of the whole system.','Pause after your key point and hold the silence.'] },
    'What do I do when I doubt the plan?': { a:'Treat doubt as data — your pattern-reading is often early. **Name the specific signal you’re seeing**, rather than a general unease, so others can test it with you.', r:['Write: “The assumption I’m least sure of is…”','Run a quick pre-mortem with one trusted colleague.','Decide what evidence would change your mind.'] },
    // Team
    'Where is our team strongest right now?': { a:'We’re strongest at seeing the big picture and moving with purpose. **Our edge is turning complexity into a clear direction** — when we name that, others look to us for it.', r:['Lead the next cross-team planning session.','Share one framework we use with another team.','Write down three wins from this quarter.'] },
    'How do we own our seat at the table?': { a:'We earn the seat by bringing the system view others don’t have. **Show up with a point of view, not just updates**, and we’ll be invited into decisions earlier.', r:['Bring one recommendation to every leadership review.','Agree our position before the meeting, not in it.','Rotate who presents so the team, not one person, is visible.'] },
    'What do we do when we doubt the plan?': { a:'We say it early and specifically. **Doubt shared on Tuesday is a pivot; doubt shared on Friday is a fire**, so we make it safe to raise.', r:['Add “What worries us?” to every weekly sync.','Run a 15-minute pre-mortem on the riskiest bet.','Name an owner for each open risk.'] },
    'When are we at our best together?': { a:'Late morning, after we’ve each had time to think alone. **We bring better ideas when we arrive with a first draft**, not a blank page.', r:['Schedule team sessions 11am–1pm.','Share a pre-read the day before.','Start with five minutes of silent writing.'] },
    'How do we protect our deep work?': { a:'We agree on it together, so no one has to defend it alone. **Shared focus blocks** make deep work a norm, not a favour.', r:['Set two team-wide no-meeting mornings.','Use one status emoji for “heads-down”.','Review in a month whether it’s holding.'] },
    'What breaks our focus as a team?': { a:'Unclear priorities and reactive requests from outside. **When everything is urgent, we default to the loudest ask** instead of the most important one.', r:['Keep one ranked priority list everyone can see.','Route outside requests through a single owner.','Say no to one thing this week, together.'] },
    'How do we land a hard message together?': { a:'We agree the message first, then decide who delivers it. **One voice, one version** stops it fragmenting across Slack threads.', r:['Draft the three-line message as a team.','Pick the messenger with the strongest relationship.','Follow up in writing within the hour.'] },
    'Why do our messages get missed?': { a:'We speak in conclusions and assume the context is shared. **Others need the why before the what**, especially outside the team.', r:['Lead every update with one line of context.','Use the same format every week.','Ask a partner team what they actually read.'] },
    'How should we open our next meeting?': { a:'With the purpose and the decision we need, then a quick round so every voice is heard once. **Hearing everyone early** keeps the quieter people in the room.', r:['Open with “Today we need to decide…”','Do a 30-second round: one word on how we’re feeling about it.','Close with owners and dates.'] },
    'What do we do when tension rises?': { a:'We slow down and name it, rather than pushing through. **Calling a two-minute pause** protects both the relationship and the decision.', r:['Agree a phrase anyone can use to pause.','Restate both positions before arguing either.','Take it offline if it’s about people, not the work.'] },
    'How do we repair after a hard meeting?': { a:'Quickly and personally. **A one-to-one check-in within a day** tells people the relationship matters more than the outcome.', r:['Each of us messages one person we clashed with.','Share what we learned at the next sync.','Thank someone publicly for their candour.'] },
    'What does each of us need in conflict?': { a:'Different things — some of us need time, some need to talk it through right away. **Knowing who needs which** stops one person’s pause from looking like another’s avoidance.', r:['Share our conflict styles in the next team meeting.','Agree that “I need an hour” is always acceptable.','Pair fast talkers with quiet thinkers on hard topics.'] },
    'Where are we duplicating ownership?': { a:'Where the work is most visible and most ambiguous. **Two owners usually means no owner**, so we name one person per outcome.', r:['List every live project and its single owner.','Turn co-owners into owner + reviewer.','Revisit the list every two weeks.'] },
    'What do we need from each other this week?': { a:'Clarity on priorities and faster hand-offs. **Saying what we need out loud** is quicker than hoping someone notices.', r:['Each of us names one request in Monday’s sync.','Flag blockers within the day, not at the end of the week.','End Friday with a two-minute thank-you round.'] },
    'What does my team need from me this week?': { a:'Clear priorities and visible thinking. Your team moves fastest when **you share the why behind the plan early**, so they can act without waiting for you.', r:['Send a Monday note with the top three priorities.','Hold 15 minutes of open office hours midweek.','Ask each person what’s blocking them.'] },
    // Integrations
    'How should I message Maya?': { a:'Maya values warmth before the ask. **Open with one line of context about her**, then make your request specific and time-bound.', r:['Start with “Thanks for…” or a quick check-in.','Put the ask and deadline in one sentence.','Offer a call if it’s complex.'] },
    'Why is Dev slow to reply?': { a:'Dev is a careful processor who replies once he’s sure. **Slow isn’t disengaged** — he wants to give you a considered answer.', r:['Tell him when you need it, and why.','Ask yes/no questions when you need speed.','Send detail in advance of meetings.'] },
    'Who needs the most context tomorrow?': { a:'Your 10am with the partner team — they’re new to the project and you speak in conclusions. **Send a three-line pre-read tonight** so the meeting starts in the middle, not the beginning.', r:['Share the goal, the decision and one open question.','Attach the one diagram that explains the system.','Leave five minutes for questions at the start.'] },
    'Where did my last call get tense?': { a:'Around minute 18, when the timeline came up and you moved straight to the fix. **The other side needed to be heard on the risk first.**', r:['Follow up with “I heard your concern about timing.”','Ask what would make the timeline feel safe.','Agree one checkpoint together.'] },
    'What should I protect time for this week?': { a:'The strategy doc due Thursday — it needs your best thinking. **Block Tuesday and Wednesday mornings** before your Notion tasks fill them.', r:['Create two 90-minute blocks titled “Strategy doc”.','Move the two lowest-priority tasks to next week.','Share a draft with one reviewer on Wednesday.'] },
    'Rewrite my headline in my voice': { a:'**“I turn complex systems into clear direction — and help teams move on it.”** It leads with your systems thinking and your purpose, in the plain, confident way you speak.', r:['Pair it with your aura card as your banner.','Use the same line in your next intro email.','Ask two colleagues if it sounds like you.'] },
    'Manager': { a:'With a close-in manager, your systems thinking and heads-down style can look like a black box — which invites more checking. **Make your progress visible before they ask**, and the hovering usually eases.', r:['Send a short Friday note: done, next, where you need them.','Agree up front which decisions are yours and which need a check-in.','Ask what they’re worried about — micromanaging is usually a risk signal.'] },
    'Workload': { a:'You lead with purpose, so you say yes to work that matters — and a full plate creeps up quietly. **Name the trade-off out loud** rather than absorbing it.', r:['List everything on your plate and rank the top three.','Tell your manager: “To do X well, I’ll pause Y.”','Protect two early mornings for the work only you can do.'] },
    'Career': { a:'Your next step is strongest where you shape the system, not just run part of it. **Look for roles where your strategic thinking is the job**, not a side skill.', r:['Write the three problems you most want to own next year.','Ask your manager which of those the business needs most.','Share one piece of strategic work more widely this month.'] },
    'Looking at my whole pattern, what’s the one thing I should lean into this month?': { a:'Lean into your systems thinking — but share it earlier. **Your biggest lever is making your thinking visible** before you’ve reached the conclusion.', r:['Post one “here’s how I’m seeing it” note each week.','Invite one person into your thinking before every big decision.','Protect two early mornings for deep work.'] }
  };
  const KW = [
    [/\b(manag(er|ers|ement)|micromanag\w*|boss|upward|leadership team|my lead)\b/i,'Manager'],
    [/\b(workload|burn ?out|burnt out|exhaust\w*|too much|overload\w*|overwhelm\w*)\b/i,'Workload'],
    [/\b(career|promot\w*|next role|job|growth path|raise)\b/i,'Career'],
    [/\b(meet\w*|1:1|one-to-one|prep\w*|agenda|call)\b/i,'How do I prep for my 2pm with Sam?'],
    [/\b(focus\w*|deep work|distract\w*|interrupt\w*)\b/i,'What breaks my focus most?'],
    [/\b(energy|morning\w*|productiv\w*|chronotype|tired)\b/i,'When am I at my best?'],
    [/\b(stress\w*|pressure|quiet|anxious|anxiety)\b/i,'Why do I go quiet under pressure?'],
    [/\b(conflict\w*|tension|argu\w*|disagree\w*|confront\w*|repair)\b/i,'How do I repair after tension?'],
    [/\b(feedback|critici\w*|review)\b/i,'How do I land a hard message?'],
    [/\b(message\w*|email\w*|slack|writ\w*|communicat\w*|my point)\b/i,'Why do people miss my point?'],
    [/\b(delegat\w*|hand off|hand over|over-own\w*|let go)\b/i,'Where do I over-own the plan?'],
    [/\b(creat\w*|ideas?|innovat\w*|structur\w*)\b/i,'How do I stop over-structuring?'],
    [/\b(decid\w*|decision\w*|doubt\w*|risk\w*)\b/i,'What do I do when I doubt the plan?'],
    [/\b(confiden\w*|own the room|presence|brand|linkedin|headline)\b/i,'Where does my confidence come from?'],
    [/\b(skeptic\w*|stakeholder\w*|buy-in|collaborat\w*)\b/i,'How do I bring a skeptic in early?']
  ];
  const TKW = [
    [/\b(meet\w*|open\w*)\b/i,'How should we open our next meeting?'],[/\b(focus\w*|deep work)\b/i,'How do we protect our deep work?'],
    [/\b(tension|conflict\w*|repair)\b/i,'What do we do when tension rises?'],[/\b(ownership|duplicat\w*|roles?)\b/i,'Where are we duplicating ownership?'],
    [/\b(message\w*|communicat\w*)\b/i,'Why do our messages get missed?'],[/\b(doubt\w*|risk\w*)\b/i,'What do we do when we doubt the plan?']
  ];
  const match = (q, team) => {
    if (A[q]) return A[q];
    for (const [re,k] of (team ? TKW : KW)) if (re.test(q)) return A[k];
    return team ? A['What do we need from each other this week?'] : A['Looking at my whole pattern, what’s the one thing I should lean into this month?'];
  };
  const BASIS = [
    [/\b(manag\w*|micromanag\w*|boss|upward)\b/i,['delegate','comm']],[/\b(workload|burn ?out|overload\w*|overwhelm\w*|too much)\b/i,['stress','energy']],
    [/\b(career|promot\w*|job|next role)\b/i,['roles','strengths']],
    [/\b(meet\w*|1:1|prep\w*|agenda|call)\b/i,['comm','energy']],[/\b(focus\w*|deep work|distract\w*|interrupt\w*)\b/i,['flow','env']],
    [/\b(energy|morning\w*|productiv\w*|tired)\b/i,['energy','flow']],[/\b(stress\w*|pressure|quiet|shut down)\b/i,['stress','resilience']],
    [/\b(conflict\w*|tension|argu\w*|disagree\w*|repair|confront\w*)\b/i,['conflict','stress']],[/\b(feedback|hard message)\b/i,['feedback','comm']],
    [/\b(message\w*|email\w*|slack|writ\w*|reply)\b/i,['comm','feedback']],[/\b(delegat\w*|hand off|hand over|over-own\w*)\b/i,['delegate','collab']],
    [/\b(creat\w*|ideas?|innovat\w*|structur\w*)\b/i,['creativity','systems']],[/\b(decid\w*|decision\w*|doubt\w*|risk\w*)\b/i,['decide','safety']],
    [/\b(confiden\w*|room|seat|brand|headline|linkedin)\b/i,['strengths','motive']],[/\b(skeptic\w*|collaborat\w*|team|each other)\b/i,['collab','grouproles']],
    [/\b(strength\w*|pattern|lean|strongest)\b/i,['strengths','systems']]
  ];
  const R = () => (window.DAILY && window.DAILY.results) || [];
  const RES_FOR = { comm:'Myers Briggs', energy:'Human Design', stress:'Enneagram', conflict:'DISC', feedback:'Love Language', strengths:'High 5', collab:'DISC', delegate:'DISC', motive:'Enneagram', creativity:'High 5', systems:'Myers Briggs', decide:'Myers Briggs', flow:'Human Design', env:'Myers Briggs', safety:'Enneagram', resilience:'Enneagram', grouproles:'High 5' };
  const basis = q => {
    const I = (window.DAILY && window.DAILY.insights) || {};
    let keys = [];
    for (const [re,k] of BASIS) if (re.test(q)) keys.push(...k);
    keys = [...new Set(keys.length ? keys : ['systems','strengths'])].slice(0,2);
    const out = [];
    keys.forEach(k => { const s = I[k] && I[k].spec && I[k].spec[0]; if (s) out.push(s[2] < .5 ? s[0] : s[1]); const r = R().find(x=>x.a===RES_FOR[k]); if (r && !out.includes(r.r)) out.push(r.r); });
    return out.slice(0,4);
  };
  const profile = () => {
    const D = window.DAILY || {}, I = D.insights || {};
    const lines = [];
    lines.push('Summary: ' + D.pattern);
    try { const sit = localStorage.getItem('cx-situation'); const S = { new:'Facing a first (new role, team or project)', broke:'Facing a fall out (conflict, a miss, a hard week)', change:'A change is needed (doesn’t yet know what)' }; if (S[sit]) lines.push('What they said is happening right now: ' + S[sit]); } catch(e) {}
    if (D.traits) lines.push('Core traits: ' + D.traits.map(t=>t.t+' ('+t.d+')').join('; '));
    if (D.brand) lines.push('Professional brand: "' + D.brand.line + '" Words: ' + D.brand.words.join(', '));
    if (D.results) lines.push('Assessments: ' + D.results.map(r=>r.a+' = '+r.r+' ('+r.n+')').join('; '));
    const spec = [];
    Object.entries(I).forEach(([k,v]) => (v.spec||[]).forEach(s => { const p = Math.round(s[2]*100); spec.push(`${s[0]}↔${s[1]}: ${p<40?'leans '+s[0]:p>60?'leans '+s[1]:'balanced'} (${p}/100, ${s[3]})`); }));
    if (spec.length) lines.push('Measured positions: ' + spec.join('; '));
    const deep = Object.entries(I).filter(([k,v])=>v.deep).map(([k,v])=>{const s=(v.deep.match(/[^.!?]+[.!?]/)||[v.deep])[0].trim();return (v.t||[]).join('').replace(/\.$/,'')+': '+s;});
    if (deep.length) lines.push('Insight notes: ' + deep.join(' '));
    return lines.join('\n');
  };
  return { answers: A, match, basis, profile };
})();
