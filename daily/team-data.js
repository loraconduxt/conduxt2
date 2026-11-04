window.TEAM = {
  name: 'Leadership team',
  members: [
    { id:'lora', n:'Lora Kantorovich', you:true, c:['#6B9BD4','#FFB6E3','#FF6B5A','#8FA590'], p:'Systems thinker · leads with purpose' },
    { id:'shaye', n:'Shaye Moessner', c:['#FF6B5A','#FFB6E3','#7A4A2E','#6B9BD4'], p:'Big-picture energizer · thinks out loud',
      pair:{ good:'You map the system; Shaye rallies people around it.', watch:'Shaye processes out loud — your quiet can read as a no.', tip:'Share your conclusion early, then invite Shaye to riff on it.' } },
    { id:'nikki', n:'Nikki Seidman', c:['#CBC064','#B8D8C0','#6E8674','#F5E6D0'], p:'Steady operator · detail first',
      pair:{ good:'Nikki turns your map into a plan that actually ships.', watch:'Nikki needs detail before buy-in; you lead with the headline.', tip:'Send the one-pager the day before, not in the meeting.' } },
    { id:'carrie', n:'Carrie Ravitz', c:['#CBC064','#7A4A2E','#FF6B5A','#B8D8C0'], p:'Decisive driver · moves fast',
      pair:{ good:'Carrie’s speed plus your structure is a strong combination.', watch:'Under pressure you both dig in — on different things.', tip:'Agree on the decision deadline before you debate the decision.' } },
    { id:'dana', n:'Dana Abramson', c:['#6B9BD4','#B8D8C0','#8FA590','#DDD1C1'], p:'Calm analyst · reads the data',
      pair:{ good:'Your strongest overlap — Dana will stress-test your thinking.', watch:'Two quiet thinkers can leave the room without a decision.', tip:'End every 1:1 by naming one owner and one next step.' } },
    { id:'alison', n:'Alison Rogers', c:['#FFB6E3','#6B9BD4','#FF6B5A','#B8D8C0'], p:'Connector · reads the room',
      pair:{ good:'Alison sees the people side of the system you design.', watch:'Alison needs warmth first; you lead with logic.', tip:'Open with what’s working before you get to what isn’t.' } },
    { id:'paul', n:'Paul Phan', c:['#FF6B5A','#FFB6E3','#F5E6D0','#CBC064'], p:'Creative spark · idea first',
      pair:{ good:'Paul generates options; you choose the path.', watch:'Paul can feel boxed in by structure that arrives too early.', tip:'Give Paul ten minutes of open ideas before you narrow.' } }
  ],
  practices: [
    { k:'claim', t:'Claim', d:'Own your space', bg:'#CBC064', ink:'#202221', ph:'e.g. Stepping into the new strategy lead role' },
    { k:'create', t:'Create', d:'Deep work & ideas', bg:'#6B9BD4', ink:'#FFFFFF', ph:'e.g. Brainstorming the Q1 roadmap' },
    { k:'communicate', t:'Communicate', d:'Before you speak', bg:'#FFB6E3', ink:'#202221', ph:'e.g. Announcing the reorg' },
    { k:'confront', t:'Confront', d:'When tension rises', bg:'#A86B47', ink:'#FFFFFF', ph:'e.g. We keep missing launch dates' },
    { k:'collaborate', t:'Collaborate', d:'Working with others', bg:'#8FA590', ink:'#FFFFFF', ph:'e.g. Splitting ownership of the launch' }
  ]
};

window.TEAM_BASE = window.TEAM;
window.TEAM_DIRECTORY = window.TEAM.members;
window.DEMO_TEAMS = [
  { id:'lead', name:'Leadership team', ids:['shaye','nikki','carrie','dana','alison','paul'] },
  { id:'launch', name:'Q1 launch pod', ids:['paul','dana','alison'] }
];
