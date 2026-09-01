'use strict';
/* ================= 计划数据：46 周三阶段（减脂→增肌→塑形） ================= */
const START = new Date(2026, 7, 10); // 2026-08-10 周一
const BIRTH = new Date(2004, 10, 3);      // 出生日期：2004-11-03
const LIFE_SPAN_YEARS = 80;               // 人生进度按 80 岁估算
const POEMS = [
  { v: "会当凌绝顶，一览众山小", s: "杜甫《望岳》" },
  { v: "欲与天公试比高", s: "毛泽东《沁园春·雪》" },
  { v: "长风破浪会有时，直挂云帆济沧海", s: "李白《行路难》" },
  { v: "天生我材必有用，千金散尽还复来", s: "李白《将进酒》" },
  { v: "千磨万击还坚劲，任尔东西南北风", s: "郑燮《竹石》" },
  { v: "宝剑锋从磨砺出，梅花香自苦寒来", s: "《警世贤文》" },
  { v: "三更灯火五更鸡，正是男儿读书时", s: "颜真卿《劝学》" },
  { v: "黑发不知勤学早，白首方悔读书迟", s: "颜真卿《劝学》" },
  { v: "少壮不努力，老大徒伤悲", s: "《长歌行》" },
  { v: "路漫漫其修远兮，吾将上下而求索", s: "屈原《离骚》" },
  { v: "天行健，君子以自强不息", s: "《周易》" },
  { v: "老骥伏枥，志在千里", s: "曹操《龟虽寿》" },
  { v: "不积跬步，无以至千里", s: "《荀子·劝学》" },
  { v: "锲而不舍，金石可镂", s: "《荀子·劝学》" },
  { v: "业精于勤，荒于嬉", s: "韩愈《进学解》" },
  { v: "书山有路勤为径，学海无涯苦作舟", s: "韩愈" },
  { v: "纸上得来终觉浅，绝知此事要躬行", s: "陆游《冬夜读书示子聿》" },
  { v: "咬定青山不放松，立根原在破岩中", s: "郑燮《竹石》" },
  { v: "海到无边天作岸，山登绝顶我为峰", s: "林则徐" },
  { v: "千淘万漉虽辛苦，吹尽狂沙始到金", s: "刘禹锡《浪淘沙》" },
  { v: "不经一番寒彻骨，怎得梅花扑鼻香", s: "黄蘖禅师《上堂开示颂》" },
  { v: "雄关漫道真如铁，而今迈步从头越", s: "毛泽东《忆秦娥·娄山关》" },
  { v: "数风流人物，还看今朝", s: "毛泽东《沁园春·雪》" },
  { v: "大鹏一日同风起，扶摇直上九万里", s: "李白《上李邕》" },
  { v: "少年辛苦终身事，莫向光阴惰寸功", s: "杜荀鹤《题弟侄书堂》" },
  { v: "及时当勉励，岁月不待人", s: "陶渊明《杂诗》" },
  { v: "沉舟侧畔千帆过，病树前头万木春", s: "刘禹锡《酬乐天扬州初逢席上见赠》" },
  { v: "莫等闲，白了少年头，空悲切", s: "岳飞《满江红》" },
];
function dailyPoem(d){
  const s = fmt(d);
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return POEMS[h % POEMS.length];
}
const TOTAL_WEEKS = 46;
const WD = ['周日','周一','周二','周三','周四','周五','周六'];
const DAY_ORDER = [1,2,3,4,5,6,0]; // 周一~周日
const DAY_NAMES = ['周一·蹲A','周二·推A','周三·蹲B','周四·拉A','周五·推B','周六·拉B','周日·主动恢复'];
const todayIdx=dow=>DAY_ORDER.indexOf(dow);

const P1_START=1, P1_END=16, P2_START=17, P2_END=36, P3_START=37, P3_END=46;
const PHASE_NAME={1:'减脂·技术期',2:'增肌·力量期',3:'塑形·冲刺期'};
const phaseOf=wk=>wk<=P1_END?1:wk<=P2_END?2:3;
const phaseStart=p=>p===1?P1_START:p===2?P2_START:P3_START;
const phaseLen=p=>p===1?16:p===2?20:10;
/* 阶段目标总览 */
const PHASE_TARGETS=[
  ['减脂·技术期','W1-16','减脂 + 推拉蹲循环打底 + 肩宽/上胸/后束补强 + 体测专项','65-67kg / 12-14%','深蹲95-100 · 硬拉125-130 · 卧推90-95 · 引体+25-30 · 功能性体能达标 · 肩围110-115'],
  ['增肌·力量期','W17-36','力量增长 + 肌肉量 + 推拉蹲×2频率 + 肩宽推进','71-73kg / 13-15%','深蹲125-135 · 硬拉155-165 · 卧推100-107 · 引体+35-40 · 摆荡 15kg×2 · 肩围115-120'],
  ['塑形·冲刺期','W37-46','再减脂到 12-13% + 力量/体能峰值','70-72kg / 12-13%','深蹲130-140 · 硬拉165-170 · 卧推107-112 · 引体+40 · 体能峰值 · 肩围118-122'],
];

/* 小周期加载：每 4 周为一个积累块（w1 基准 → w2 +2.5 → w3 +5 → w4 减载回落基准），下一块基准 +step
   减载周=回落小周期起始重量（较峰值 -5kg），不低于起点，避免"第 4 周比第 1 周还轻"的断层感 */
function blockSeries(start, step, weeks){
  const out=[]; let base=start;
  while(out.length<weeks){
    const block=[base, base+2.5, base+5, base];
    for(let k=0;k<4&&out.length<weeks;k++) out.push(block[k]);
    base+=step;
  }
  return out;
}
const liftConf={
  squat:[ [47.5,7.5,16],[72.5,12.5,20],[125,10,10] ],
  bench:[ [70,5,16],[82.5,5,20],[105,5,10] ],
  dl:   [ [52.5,10,16],[90,15,20],[155,10,10] ],
  pullup:[ [10,2.5,16],[22.5,2.5,20],[35,2.5,10] ],
  front:[ [42.5,2.5,16],[57.5,5,20],[77.5,5,10] ],
  rdl:  [ [45,5,16],[67.5,5,20],[92.5,5,10] ],
  row:  [ [42.5,2.5,16],[62.5,5,20],[87.5,5,10] ],
  pp:   [ [32.5,2.5,16],[47.5,5,20],[72.5,5,10] ],
  pushpress:[ [35,2.5,16],[52.5,5,20],[80,5,10] ],
  hp:   [ [20,10,16],[65,7.5,20],[95,7.5,10] ],
  clean:[ [35,5,16],[55,5,20],[85,2.5,10] ],
};
const LOAD={};
Object.keys(liftConf).forEach(k=>{
  LOAD[k]=liftConf[k].reduce((arr,c)=>arr.concat(blockSeries(c[0],c[1],c[2])),[]);
});

/* 主项次数：按阶段 + 4 周小周期位置（w4 减载） */
function wkInBlock(wk){ return ((wk-phaseStart(phaseOf(wk)))%4)+1; }
function mainReps(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  if(b===4) return '3×5（减载）';
  if(p===1) return {1:'5×5',2:'5×5',3:'5×4'}[b];
  if(p===2) return {1:'5×5',2:'5×5',3:'5×4'}[b];
  return {1:'4×4',2:'4×3',3:'3×3'}[b];
}
function dlReps(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  if(b===4) return '2×5（减载）';
  if(p===1) return '3×5（技术优先）';
  if(p===2) return {1:'3×5',2:'4×5',3:'4×4'}[b];
  return {1:'3×4',2:'3×3',3:'3×3'}[b];
}
function hpName(wk){
  const p=phaseOf(wk);
  if(p===1) return wk<=8?'悬垂高拉（分解→连贯）':'膝上高拉（衔接高翻）';
  if(p===2) return '高拉（技术辅助）';
  return '高拉（轻量技术）';
}
function hpSets(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  if(b===4) return '2×2（减载技术复看）';
  if(p===1) return {1:'4×3',2:'5×3',3:'5×2-3'}[b];
  if(p===2) return {1:'5×2-3',2:'4×2-3',3:'4×2'}[b];
  return {1:'4×2',2:'3×2-3',3:'3×2'}[b];
}
function cleanName(wk){
  const p=phaseOf(wk);
  if(p===1){
    if(wk<=4) return '悬垂高翻（空杆技术）';
    if(wk<=6) return '悬垂高翻（轻技术）';
    if(wk<=10) return '膝上高翻（半蹲接杠）';
    return '高翻（膝上→膝下渐进）';
  }
  if(p===2) return '高翻（膝上→膝下渐进）';
  return '高翻 + 接杠稳定';
}
function cleanSets(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  if(b===4) return '2×2（减载技术复看）';
  if(p===1) return wk<=4?'5×3（空杆技术）':wk<=6?'5×3（轻技术）':'3×3（技术优先，轻重量）';
  if(p===2) return {1:'3×3',2:'3×2-3',3:'3×2'}[b];
  return {1:'3×2',2:'3×2',3:'2×2+'}[b];
}
function ppSets(wk){
  return wkInBlock(wk)===4?'2×3（减载）':'4×3';
}
function isCleanWeek(wk){ return wk>=3; }
function cleanLoad(wk){
  if(wk<=4) return '20kg（空杆技术）';
  if(wk<=6) return '25kg';
  if(wk<=8) return '30kg';
  if(wk<=12) return '30-35kg';
  if(wk<=16) return '35-40kg';
  if(wk<=24) return '45-55kg';
  if(wk<=36) return '60-75kg';
  return '80-90kg';
}
const jsLoad=(wk)=>wk<=24?'25kg':wk<=32?'30kg':wk<=39?'35kg':wk<=44?'40kg':'42.5kg';
function jumpOf(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  if(p===1) return ['跳箱 / 摆臂纵跳','4×3','24-30寸箱/自重'];
  if(p===2) return b%2?['跳深（30-40cm箱）','4×3-5','自重']:['负重蹲跳（30%极限重量）','3×4',jsLoad(wk)];
  return b<=3?['负重蹲跳（30%极限重量）','3×4',jsLoad(wk)]:['单脚跳（踝弹性）','3×3/侧','自重'];
}
function phaseGoalNote(wk){
  const p=phaseOf(wk), b=wkInBlock(wk);
  const goals={1:'减脂期：热量按久坐基准-300-400，蛋白 2.0g/kg；动作模式打底（蹲/拉/推/髋铰链/爆发）',2:'增肌期：热量 +250，蛋白 2.0g/kg；每周加重，高翻逐步加量',3:'塑形期：热量 -300，蛋白 2.0g/kg；力量与爆发保底'};
  return goals[p]+'（小周期第 '+b+' 周'+(b===4?' · 减载周':'')+'）';
}
const parseLoad=s=>{const m=String(s).match(/(\d+(?:\.\d+)?)/);return m?parseFloat(m[1]):0;};
function restOf(it){
  if(it.main)return '休3-5分钟';
  const n=it.name;
  if(n.includes('热身')||n.includes('拉伸'))return '—';
  if(n.includes('跳')||n.includes('高拉')||n.includes('摆动')||n.includes('摆荡')||n.includes('借力推'))return '休3-5分钟';
  if(n.includes('前蹲')||n.includes('罗马尼亚')||n.includes('实力推')||n.includes('侧平举'))return '休2-3分钟';
  if(n.includes('农夫'))return '休90秒';
  return '休60-90秒';
}
/* 核心计划不固定重量：含 kg 的负荷显示为"自定"，由本人按当天状态安排 */
function autoLoad(s){
  if(!s)return s;
  return /kg/.test(String(s))?'自定':s;
}

/* ================= 饮食：按阶段 × 训练/休息 ================= */
const DIET={
  1:{
    A:[
      ['8:00 早餐','燕麦 50g 煮粥 + 全蛋 2 个 + 蛋清 2 个 + 乳清蛋白 1 勺 + 蓝莓 1 份','~45g'],
      ['12:30 午餐','生米 60g（≈熟饭 180g）+ 鸡胸肉 200g + 大份蔬菜','~50g'],
      ['16:00 练前加餐','香蕉 1 根 + 乳清蛋白 1 勺','~25g'],
      ['19:30 晚餐','生米 40g（≈熟饭 120g）+ 瘦牛肉 150g + 蔬菜 + 坚果 8g','~33g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    B:[
      ['8:00 早餐','燕麦 50g + 全蛋 3 个 + 乳清蛋白 1 勺 + 坚果 8g','~44g'],
      ['12:30 午餐','红薯 250g + 虾 220g + 蔬菜','~46g'],
      ['16:00 练前加餐','全麦面包 2 片 + 乳清蛋白 1 勺 + 坚果 7g','~26g'],
      ['19:30 晚餐','生米 40g（≈熟饭 120g）+ 鸡胸肉 200g + 蔬菜','~44g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    C:[
      ['8:00 早餐','燕麦 45g + 无糖酸奶 200g + 乳清蛋白 1 勺 + 全蛋 2 个 + 坚果 8g','~44g'],
      ['12:30 午餐','玉米 1 根 + 瘦牛肉 180g + 蔬菜','~38g'],
      ['16:00 练前加餐','苹果 1 个 + 乳清蛋白 1 勺','~24g'],
      ['19:30 晚餐','生米 45g（≈熟饭 135g）+ 鱼 220g + 蔬菜','~36g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    REST:[
      ['8:00 早餐','燕麦 50g + 全蛋 2 个 + 乳清蛋白 1 勺 + 坚果 8g','~36g'],
      ['12:30 午餐','生米 50g（≈熟饭 150g）+ 鸡胸肉 180g + 蔬菜','~46g'],
      ['16:00 加餐','无糖酸奶 200g + 水果 1 份','~12g'],
      ['19:30 晚餐','红薯 220g + 瘦牛肉 150g + 蔬菜 + 坚果 8g','~33g'],
    ],
  },
  2:{
    A:[
      ['8:00 早餐','燕麦 80g + 全蛋 3 个 + 乳清蛋白 1 勺 + 坚果 10g','~45g'],
      ['12:30 午餐','生米 90g（≈熟饭 270g）+ 鸡胸肉 220g + 蔬菜','~54g'],
      ['16:00 练前加餐','香蕉 2 根 + 乳清蛋白 1 勺 + 全麦面包 2 片','~30g'],
      ['19:30 晚餐','生米 70g（≈熟饭 210g）+ 瘦牛肉 180g + 蔬菜 + 坚果 10g','~40g'],
      ['22:30 睡前','牛奶 300ml + 无糖酸奶 150g','~14g'],
    ],
    B:[
      ['8:00 早餐','隔夜燕麦（燕麦 80g + 牛奶 250ml）+ 全蛋 3 个 + 坚果 10g','~38g'],
      ['12:30 午餐','红薯 350g + 虾 280g + 蔬菜','~50g'],
      ['16:00 练前加餐','全麦面包 3 片 + 乳清蛋白 1 勺 + 花生酱 10g','~28g'],
      ['19:30 晚餐','生米 70g（≈熟饭 210g）+ 鸡胸肉 200g + 蔬菜','~44g'],
      ['22:30 睡前','无糖酸奶 200g','~10g'],
    ],
    C:[
      ['8:00 早餐','燕麦 70g + 无糖酸奶 200g + 乳清蛋白 1 勺 + 全蛋 3 个 + 坚果 10g','~48g'],
      ['12:30 午餐','玉米 2 根 + 瘦牛肉 200g + 蔬菜','~42g'],
      ['16:00 练前加餐','香蕉 1 根 + 乳清蛋白 1 勺','~24g'],
      ['19:30 晚餐','生米 75g（≈熟饭 225g）+ 鱼 280g + 蔬菜','~42g'],
      ['22:30 睡前','牛奶 250ml','~8g'],
    ],
    REST:[
      ['8:00 早餐','燕麦 70g + 全蛋 3 个 + 乳清蛋白 1 勺 + 坚果 10g','~42g'],
      ['12:30 午餐','生米 80g（≈熟饭 240g）+ 鸡胸肉 200g + 蔬菜','~50g'],
      ['16:00 加餐','无糖酸奶 200g + 水果 1 份 + 全麦面包 2 片','~18g'],
      ['19:30 晚餐','生米 60g（≈熟饭 180g）+ 瘦牛肉 180g + 蔬菜 + 坚果 8g','~40g'],
    ],
  },
  3:{
    A:[
      ['8:00 早餐','燕麦 55g + 全蛋 2 个 + 蛋清 3 个 + 乳清蛋白 1 勺','~48g'],
      ['12:30 午餐','生米 60g（≈熟饭 180g）+ 鸡胸肉 220g + 大份蔬菜','~52g'],
      ['16:00 练前加餐','香蕉 1 根 + 乳清蛋白 1 勺','~25g'],
      ['19:30 晚餐','生米 40g（≈熟饭 120g）+ 瘦牛肉 150g + 蔬菜 + 坚果 8g','~33g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    B:[
      ['8:00 早餐','燕麦 55g + 全蛋 3 个 + 乳清蛋白 1 勺 + 坚果 8g','~46g'],
      ['12:30 午餐','红薯 250g + 虾 240g + 蔬菜','~48g'],
      ['16:00 练前加餐','全麦面包 2 片 + 乳清蛋白 1 勺','~26g'],
      ['19:30 晚餐','生米 40g（≈熟饭 120g）+ 鸡胸肉 200g + 蔬菜','~44g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    C:[
      ['8:00 早餐','燕麦 50g + 无糖酸奶 200g + 乳清蛋白 1 勺 + 全蛋 2 个 + 坚果 8g','~44g'],
      ['12:30 午餐','玉米 1 根 + 瘦牛肉 180g + 蔬菜','~38g'],
      ['16:00 练前加餐','苹果 1 个 + 乳清蛋白 1 勺','~24g'],
      ['19:30 晚餐','生米 50g（≈熟饭 150g）+ 鱼 230g + 蔬菜','~36g'],
      ['22:30 睡前（可选）','无糖酸奶 150g','~6g'],
    ],
    REST:[
      ['8:00 早餐','燕麦 55g + 全蛋 2 个 + 乳清蛋白 1 勺 + 坚果 8g','~36g'],
      ['12:30 午餐','生米 55g（≈熟饭 165g）+ 鸡胸肉 190g + 蔬菜','~48g'],
      ['16:00 加餐','无糖酸奶 200g + 水果 1 份','~12g'],
      ['19:30 晚餐','红薯 200g + 瘦牛肉 150g + 蔬菜 + 坚果 8g','~33g'],
    ],
  },
};
/* 热量按“全天久坐、不含训练”计算，随最近记录体重自动换算
   Mifflin-St Jeor：BMR = 10×体重 + 6.25×身高(177) - 5×年龄(22) + 5；久坐 TDEE = BMR × 1.2
   训练日的热量已含训练支出与练前加餐；休息日缺口更大。70kg 时数值与原校准一致。 */
const DIET_NOTE='热量按最近记录体重 + 久坐消耗自动换算（不含训练）。训练日本身已含练前加餐的能量；当天若额外运动（散步/跑步/冲刺），每 30 分钟中高强度活动可自行补约 100-150kcal 碳水。';
function currentWeight(){
  const rec=body.slice().sort((a,b)=>a.date<b.date?-1:1).filter(b=>b.weight).pop();
  const w=rec?Number(rec.weight):70;
  return Math.min(150,Math.max(50,w));
}
/* 阶段 × 训练/休息日 → 每日热量与三大营养素（碳水=热量扣掉蛋白/脂肪后补齐） */
function macroFor(phase, tag){
  const kg=currentWeight();
  const tdee=1.2*(10*kg+6.25*177-5*22+5);
  const off=tag==='A'?0:tag==='B'?-20:-40; // 训练日 A/B/C 轮换，仅微调热量
  const isRest=tag==='REST';
  let kcal,p,f;
  if(phase===2){ // 增肌期：+250 左右
    kcal=isRest?tdee+210:tdee+460+off;
    p=Math.round((isRest?1.93:2.07)*kg);
    f=Math.round((isRest?0.79:0.86)*kg);
  }else{ // 减脂/塑形：缺口 300-400
    kcal=isRest?tdee-390:(phase===1?tdee-140:tdee-190)+off;
    p=Math.round((isRest?1.93:2.14)*kg);
    f=Math.round((isRest?0.69:0.71)*kg);
  }
  kcal=Math.round(kcal/10)*10;
  const c=Math.max(0,Math.floor((kcal-4*p-9*f)/4/5)*5);
  return {kcal,p,f,c,kg};
}
const DIET_LABEL={
  1:{A:'减脂期·训练日A',B:'减脂期·训练日B',C:'减脂期·训练日C',REST:'减脂期·休息日'},
  2:{A:'增肌期·训练日A',B:'增肌期·训练日B',C:'增肌期·训练日C',REST:'增肌期·休息日'},
  3:{A:'塑形期·训练日A',B:'塑形期·训练日B',C:'塑形期·训练日C',REST:'塑形期·休息日'},
};
const dietTag=(wk,isTrain)=>isTrain?['A','B','C'][(wk-1)%3]:'REST';

/* ================= 工具 ================= */
const day0=d=>new Date(d.getFullYear(),d.getMonth(),d.getDate());
const fmt=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const parseDate=s=>{const p=s.split('-').map(Number);return new Date(p[0],p[1]-1,p[2]);};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const weekOf=d=>{const diff=(day0(d)-day0(START))/86400000;const w=Math.floor(diff/7)+1;return Math.max(1,Math.min(TOTAL_WEEKS,w));};
function todayDay(){
  const now=new Date(),dow=now.getDay();
  if(!(dow===1||dow===2||dow===4||dow===5))return null;
  const di=todayIdx(dow);
  return buildDay(weekOf(now),di);
}
function lastLiftWeight(lift,excludeKey){
  const keys=Object.keys(logs).filter(k=>k!==excludeKey).sort();
  for(let i=keys.length-1;i>=0;i--){
    const lg=logs[keys[i]];
    if(lg&&lg.lifts&&lg.lifts[lift])return {w:lg.lifts[lift],d:keys[i]};
  }
  return null;
}
function lastExWeight(name,excludeKey){
  const keys=Object.keys(logs).filter(k=>k!==excludeKey).sort();
  for(let i=keys.length-1;i>=0;i--){
    const lg=logs[keys[i]];
    if(lg&&lg.exWts&&lg.exWts[name]!=null)return {w:lg.exWts[name],d:keys[i]};
  }
  return null;
}
function canRecordWeight(n){
  return !(n.includes('热身')||n.includes('拉伸')||n.includes('快走')||n.includes('骑行')||n.includes('冲刺')||n.includes('1000米')||n.includes('10×4')||n.includes('折返')||n.includes('轻松引体')||n.includes('悬挂'));
}
function fmtShort(ds){const p=String(ds).split('-');return p[1]+'/'+p[2];}
function parseSets(s){
  if(!s)return 0;
  const m=String(s).match(/^\s*(\d+)(?:-\d+)?\s*×/);
  return m?parseInt(m[1],10):0;
}
const weekStart=wk=>new Date(START.getFullYear(),START.getMonth(),START.getDate()+(wk-1)*7);
/* 每个训练日的预计时长（分钟）：减载周缩短 10 分钟 */
const DAY_DURATION={0:{base:80,deload:70},1:{base:70,deload:60},2:{base:85,deload:75},3:{base:70,deload:60},4:{base:60,deload:50},5:{base:60,deload:50},6:{base:40,deload:40}};
const dayDuration=(wk,idx)=>wkInBlock(wk)===4?DAY_DURATION[idx].deload:DAY_DURATION[idx].base;

/* ================= 课表构建（含肩宽专项 + 全面发展） ================= */
function buildDay(wk,idx){
  const i=wk-1,p=phaseOf(wk),j=jumpOf(wk),mr=mainReps(wk);
  const acc=(p1,p2,p3)=>[p1,p2,p3][p-1];
  const rir='末组RIR 0-1（接近力竭）；动作变形即停组';
  const bulgarianLoad=(wk)=>wk<=16?'哑铃 10-12.5kg×2':wk<=24?'哑铃 15kg×2':wk<=28?'杠铃 35kg':wk<=32?'杠铃 40kg':wk<=36?'杠铃 42.5kg':wk<=40?'杠铃 45kg':wk<=44?'杠铃 47.5kg':'杠铃 50kg';
  const cond=p===1?'；条件加重：上组留≤2次余力才+2.5kg':'';
  const mainPow=isCleanWeek(wk)
    ? [cleanName(wk),cleanSets(wk),cleanLoad(wk),'高翻：轻技术优先（≤70%极限），每组都干净才加重；末组'+rir+'；接住后控制下放',true,'clean']
    : [hpName(wk),hpSets(wk),LOAD.hp[i]+'kg','爆发主项，速度优先；先分解再连贯',true,'highpull'];
  const lists=[
    /* 周一 · 蹲A【重】 */
    [
      ['动态热身（高抬腿/弓步走/髋绕环/踝膝活动）','8分钟','自重','提高体温与活动度',false,null],
      ['深蹲（主项，空杆递增2-3组）',mr,LOAD.squat[i]+'kg','主项：'+rir+'；速度掉20%停组'+cond,true,'squat'],
      ['罗马尼亚硬拉（RDL）','3×8-10',LOAD.rdl[i]+'kg','辅项·腘绳肌；RIR 2-3',false,null],
      ['保加利亚分腿蹲','3×8-10/侧',bulgarianLoad(wk),'辅项·单腿补弱；RIR 2-3',false,null],
      ['跳深 / 跳箱（下肢弹性）','4×3-5','30-40cm箱','落地缓冲，质量优先',false,null],
      ['摸高 / 单脚跳（踝弹性）','3×3-5','自重','爆发动作，每次全速',false,null],
      ['站姿提踵','3×12-15',acc('负重 20-30kg','负重 25-35kg','负重 30-40kg'),'辅项·踝与小腿；RIR 2-3',false,null],
      ['静态拉伸（髋屈肌/腘绳肌/小腿）','5分钟','—','收尾放松',false,null],
    ],
    /* 周二 · 推A【重】 */
    [
      ['热身（肩环绕/弹力带激活/俯卧撑递增）','8分钟','自重/弹力带','激活肩袖与胸肩',false,null],
      ['卧推（主项）',mr,LOAD.bench[i]+'kg','主项：'+rir+'；保持杠速'+cond,true,'bench'],
      ['上斜哑铃卧推（上胸）','3×10-12','哑铃 10-15kg（自定）','上胸弱区；RIR 2-3，严格控制',false,null],
      ['借力推（功能性推）',ppSets(wk),LOAD.pushpress[i]+'kg','髋膝蹬伸→推举，速度优先',false,'pushpress'],
      ['哑铃侧平举（中束·肩宽）',acc('4×12-15','5×12-15','4×15'),acc('10kg×2','12.5kg×2','15kg×2'),'肩宽专项；RIR 2-3，严格不借力',false,null],
      ['仰卧臂屈伸（碎颅者）','3×10-12',acc('10kg','12.5kg','15→20kg（W杆）'),'辅项·三头长头；RIR 2-3，手肘朝前慢放',false,null],
      ['平板支撑','3×45s','自重','核心稳定',false,null],
      ['静态拉伸（肩前/胸/三头）','5分钟','—','收尾',false,null],
    ],
    /* 周三 · 蹲B【中】 */
    [
      ['热身（动态+空杆前蹲架位）','8分钟','空杆','前架位热身',false,null],
      ['前蹲','3×6-8',LOAD.front[i]+'kg','技术巩固，不冲极限',false,null],
      ['硬拉（轻/技术）','3×5',LOAD.dl[i]+'kg','髋铰链、杠铃贴身；主项：'+rir,true,'dl'],
      ['保加利亚分腿蹲（轻）','3×10-12/侧',bulgarianLoad(wk),'辅项·单腿容量；RIR 2-3',false,null],
      ['农夫行走','3×30-40s',acc('哑铃 10-12.5kg/侧','哑铃 12.5-15kg/侧','哑铃 15-17.5kg/侧'),'辅项·握力+核心；RIR 2-3',false,null],
      ...(p===2
        ? [['30-40m 冲刺（维持体测）','4×30-40m','自重','增肌期维持，不冲强度',false,null]]
        : [['1000米节奏跑（体测专项）','1次','自重','70-75%用力；体测前4-6周再上强度',false,null],
           ['10×4 折返跑（体测专项）','3组','自重','转身技术优先',false,null]]),
      ['平板支撑 + 死虫','各3组','自重','核心稳定+控制',false,null],
      ['静态拉伸（髋/腘绳/小腿）','5分钟','—','收尾',false,null],
    ],
    /* 周四 · 拉A【重】 */
    [
      ['热身（肩胛激活/弹力带/悬挂放松）','8分钟','自重/弹力带','激活背阔与肩胛',false,null],
      ['负重引体（宽握，主项）',mr,'+'+LOAD.pullup[i]+'kg','全程控制，不摆荡；宽握练宽度；主项：'+rir,true,'pullup'],
      ['杠铃划船','4×6-8',LOAD.row[i]+'kg','辅项·背部厚度；RIR 2-3，脊柱中立',false,null],
      ['弹力带面拉（后束+肩袖）','3×15-20','弹力带','辅项·肩胛健康（防圆肩）；RIR 2-3',false,null],
      ['二头弯举','3×10-12',acc('20-25kg','25-30kg','30-35kg'),'辅项·臂围；RIR 2-3',false,null],
      ['悬垂举腿（控制版）','3×10-12','自重','腹直肌·慢放；轻松×12→负重',false,null],
      ['静态拉伸（背/二头/胸椎）','5分钟','—','收尾',false,null],
    ],
    /* 周五 · 推B【中】 */
    [
      ['热身（肩环绕/弹力带/俯卧撑）','8分钟','自重/弹力带','激活肩胸',false,null],
      ['实力推（主项）','3×5',LOAD.pp[i]+'kg','主项：'+rir+'；全身发力模式',true,'pp'],
      ['卧推（轻容量）','3×6-8',LOAD.bench[i]+'kg','轻重量高次数，RIR 2-3',false,'bench'],
      ['双杠臂屈伸','3×8-10',acc('自重 ~ +5kg','+10 ~ +15kg','+17.5 ~ +22.5kg'),'辅项·胸下束+三头；RIR 2-3',false,null],
      ['上斜哑铃卧推（上胸）','3×10-12','哑铃 10-15kg（自定）','上胸弱区；RIR 2-3，严格控制',false,null],
      ['哑铃侧平举（中束）','3×15-20','哑铃（自定）','中束；RIR 2-3，不借力',false,null],
      ['静态拉伸（肩前/胸/三头）','5分钟','—','收尾',false,null],
    ],
    /* 周六 · 拉B【中】 */
    [
      ['热身（肩胛激活/弹力带）','8分钟','自重/弹力带','激活背阔与肩胛',false,null],
      ['宽握引体','3×8-10','自重或负重','容量·背阔宽度；RIR 2-3',false,'pullup'],
      ['杠铃划船','3×8-10',LOAD.row[i]+'kg','辅项·背部厚度；RIR 2-3，脊柱中立',false,null],
      ['弹力带面拉（后束）','3×15','弹力带','后束+肩袖；RIR 2-3',false,null],
      ['二头弯举','3×10-12',acc('20-25kg','25-30kg','30-35kg'),'辅项·臂围；RIR 2-3',false,null],
      ['死虫','3×10/侧','自重','核心控制',false,null],
      ['静态拉伸（背/二头/胸椎）','5分钟','—','收尾',false,null],
    ],
    /* 周日 · 主动恢复【轻】 */
    [
      ['快走 / 骑行台（低强度）','30-40分钟','—','主动恢复·心率轻松；累了直接休息',false,null],
      ['全身拉伸 / 泡沫轴','15分钟','—','放松主要肌群',false,null],
      ['死虫 + 平板支撑','各2组','自重','核心轻量；状态差跳过',false,null],
      ['轻松引体 / 悬挂（可选）','2×5-8','自重','状态好才做；累了就休息',false,null],
    ],
  ];
  const d=new Date(weekStart(wk));d.setDate(d.getDate()+((DAY_ORDER[idx]+6)%7));
  return {name:DAY_NAMES[idx],date:d,dateStr:fmt(d),duration:dayDuration(wk,idx),items:lists[idx].map(x=>{const it={name:x[0],sets:x[1],load:autoLoad(x[2]),planLoad:x[2],note:x[3],main:x[4],lift:x[5]};it.rest=restOf(it);return it;})};
}
function buildWeek(wk){
  return {wk:wk,label:'第 '+wk+' 周 · '+PHASE_NAME[phaseOf(wk)],days:DAY_ORDER.map((_,i)=>buildDay(wk,i))};
}

/* ================= 本地存储 ================= */
const LS={settings:'gkx_settings_v2',logs:'gkx_logs_v1',body:'gkx_body_v1'};
const load=(k,d)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(e){return d;}};
const save=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));}catch(e){alert('保存失败：本地存储不可用');}};
let settings=load(LS.settings,{});
let logs=load(LS.logs,{});
let body=load(LS.body,[]);
const todayKey=fmt(new Date());
function logFor(key){
  if(!logs[key])logs[key]={diet:{},work:{},lifts:{},sets:{}};
  return logs[key];
}
function persist(){save(LS.logs,logs);}

/* ================= 图表 ================= */
function drawChart(canvas,series){
  const ctx=canvas.getContext('2d');
  const w=canvas.width,h=canvas.height,padL=42,padR=12,padT=14,padB=26;
  ctx.clearRect(0,0,w,h);
  const all=[].concat(...series.map(s=>s.points));
  if(all.length===0){ctx.fillStyle='#999';ctx.font='13px sans-serif';ctx.fillText('暂无数据',w/2-28,h/2);return;}
  let min=Math.min(...all),max=Math.max(...all);
  if(min===max){min-=1;max+=1;}
  const span=max-min;
  const n=Math.max(...series.map(s=>s.points.length));
  const X=i=>padL+(n===1?w/2:padL+(w-padL-padR)*i/(n-1));
  const Y=v=>padT+(h-padT-padB)*(1-(v-min)/span);
  ctx.strokeStyle='#EDF0F4';ctx.lineWidth=1;
  for(let g=0;g<=4;g++){const v=min+span*g/4,y=Y(v);ctx.beginPath();ctx.moveTo(padL,y);ctx.lineTo(w-padR,y);ctx.stroke();ctx.fillStyle='#999';ctx.font='10px sans-serif';ctx.fillText(v.toFixed(1),4,y+3);}
  series.forEach(s=>{
    ctx.strokeStyle=s.color;ctx.lineWidth=2;ctx.beginPath();
    s.points.forEach((v,i)=>{const x=X(i),y=Y(v);i===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});
    ctx.stroke();
    s.points.forEach((v,i)=>{ctx.fillStyle=s.color;ctx.beginPath();ctx.arc(X(i),Y(v),3,0,Math.PI*2);ctx.fill();});
    if(s.labels){ctx.fillStyle=s.color;ctx.font='9px sans-serif';s.points.forEach((v,i)=>{ctx.fillText(s.labels[i],X(i)-12,Y(v)-8);});}
  });
}

/* ================= 渲染：今天 ================= */
function renderToday(){
  const now=new Date(),d=day0(now),wk=weekOf(d),dow=d.getDay();
  const key=fmt(d),L=logFor(key);
  const isTrain=true;
  const p=phaseOf(wk);
  const tt=document.getElementById('todayTrainTitle');
  if(tt)tt.textContent=dow===0?'今日·主动恢复（轻）':'今日训练模板';
  document.getElementById('todayLine').textContent=
    d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'日 · '+WD[dow]+' · 第 '+wk+' 周 · '+PHASE_NAME[p]+'（小周期第 '+wkInBlock(wk)+' 周）';
  const msLife=day0(now)-day0(BIRTH);
  const lifeDays=Math.floor(msLife/86400000);
  const lifeYears=msLife/86400000/365.2425;
  const progress=Math.min(100,Math.max(0,(lifeYears/LIFE_SPAN_YEARS)*100)).toFixed(1);
  const poem=dailyPoem(now);
  document.getElementById('lifeChip').innerHTML=
    '<div class="life-poem">'+esc(poem.v)+'</div>'+
    '<div class="life-meta">'+esc(poem.s)+' · 人生进度 '+progress+'% · 出生 '+lifeDays+' 天</div>';

  // 训练
  const wkEl=document.getElementById('todayWorkout');
  if(isTrain){
    const di=todayIdx(dow);
    const day=buildDay(wk,di);
    const items=day.items.map(it=>{
      const total=parseSets(it.sets);
      const setsDone=total>0?((L.sets&&L.sets[it.name])||0):(L.work[it.name]?1:0);
      const done=total>0?setsDone>=total:!!L.work[it.name];
      const remain=Math.max(0,total-setsDone);
      let track='';
      if(total>0){
        track='<div class="ex-track">'+
          '<span class="remain'+(remain===0?' done':'')+'">'+(remain>0?'剩 '+remain+' 组':'✓ 已完成')+'</span>'+
          (remain>0?'<button class="set-btn" data-set="'+esc(it.name)+'" data-total="'+total+'">完成1组</button>':'')+
          (setsDone>0?'<button class="undo-btn" data-undo="'+esc(it.name)+'" title="撤回一组">↺</button>':'')+
          '</div>';
      }
      const wtRow=canRecordWeight(it.name)?(function(){
        const cur=(L.exWts&&L.exWts[it.name]!=null)?L.exWts[it.name]:(it.lift&&L.lifts?L.lifts[it.lift]:null);
        const last=lastExWeight(it.name,key)||(it.lift?lastLiftWeight(it.lift,key):null);
        const disp=cur?('本次 '+cur+'kg'):(last?('上次 '+last.w+'kg（'+fmtShort(last.d)+'）'):'未记录');
        return '<div class="ex-wt">重量：<b>'+disp+'</b> <button class="wt-btn" data-lift="'+(it.lift||'')+'" data-name="'+esc(it.name)+'">记录</button></div>';
      })():'';
      return '<div class="ex-item'+(done?' done':'')+'">'+
        '<input type="checkbox" data-wk="'+wk+'" data-ex="'+esc(it.name)+'" data-main="'+(it.main?'1':'0')+'" data-load="'+esc(it.load)+'" data-lift="'+(it.lift||'')+'" '+(done?'checked':'')+'>'+
        '<div class="ex-main"><div class="ex-name">'+esc(it.name)+'</div>'+
        '<div class="ex-meta">'+esc(it.sets)+' · '+esc(it.load)+(it.rest&&it.rest!=='—'?' · <span class="rest">'+esc(it.rest)+'</span>':'')+'</div>'+
        track+
        wtRow+
        (it.note?'<div class="ex-note">'+esc(it.note)+'</div>':'')+'</div></div>';
    }).join('');
    wkEl.innerHTML='<div class="rest-note" style="margin-bottom:8px">今日：'+esc(day.name)+'（'+WD[day.date.getDay()]+' '+day.date.getMonth()+1+'/'+day.date.getDate()+'）· 预计约 '+day.duration+' 分钟<br>'+esc(phaseGoalNote(wk))+'</div>'+items;
  }else{
    wkEl.innerHTML='<div class="rest-note big">💤 好好休息<br>恢复也是训练的一部分：散步或快走 20-30 分钟、拉伸、睡前泡沫轴。<br>可选体测补强（每周 1-2 次，服务 12 月体测）：轻松跑/快走 20-30 分钟 + 4×30-40m 冲刺（热身充分）+ 10×4 折返 3 组。状态差直接休息。<br>'+esc(phaseGoalNote(wk))+'</div>';
  }

  // 饮食（按阶段）
  const tag=dietTag(wk,isTrain),macro=macroFor(p,tag);
  document.getElementById('dietTag').textContent=DIET_LABEL[p][tag];
  document.getElementById('todayDiet').innerHTML=macroBlockHTML(macro);

  // 汇总
  const totalEx=isTrain?buildDay(wk,todayIdx(dow)).items.length:0;
  const doneEx=isTrain?Object.values(L.work).filter(Boolean).length:0;
  document.getElementById('todaySummary').innerHTML=
    '<div class="sum-card"><div class="num">'+doneEx+'<small style="font-size:12px">/'+totalEx+'项</small></div><div class="lbl">训练</div></div>'+
    '<div class="sum-card"><div class="num">'+macro.kcal+'<small style="font-size:12px">kcal</small></div><div class="lbl">今日热量目标</div></div>';

  // 每日体重/腰围/肩围
  const todayBody=body.find(b=>b.date===key);
  document.getElementById('dailyWeightBlock').innerHTML=
    '<div class="form-row"><label>今日体重(kg) <input type="number" id="dailyWeightInput" step="0.1" placeholder="70.0" value="'+(todayBody&&todayBody.weight?todayBody.weight:'')+'"></label>'+
    '<button id="dailyWeightSave" class="btn primary">保存</button></div>'+
    (todayBody&&todayBody.weight?'<div class="hint">今日已记录：'+todayBody.weight+'kg'+(todayBody.waist?' · 腰围 '+todayBody.waist+'cm':'')+(todayBody.shoulder?' · 肩围 '+todayBody.shoulder+'cm':'')+'</div>':'<div class="hint">建议每天早晨空腹、上完厕所后称重，数字更稳定。</div>');
}

/* ================= 渲染：计划 ================= */
let selWeek=weekOf(new Date());
function renderPlan(){
  document.getElementById('phaseTable').innerHTML='<tr><th>阶段</th><th>周次</th><th>主题</th><th>目标</th><th>力量/体型里程碑</th></tr>'+
    PHASE_TARGETS.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('');
  const alloc=[
    ['减脂·技术期','W1-16','6练/周（推拉蹲×2）+周日恢复','主项 5×5（减载 3×5）','中容量：每肌群约 8-12 组/周','蹲B：1000米+10×4（体测专项）','按体重自动换算 · 蛋白 ~2.1g/kg'],
    ['增肌·力量期','W17-36','6练/周（推拉蹲×2）+周日恢复','主项 5×5（减载 3×5）','高容量：每肌群约 12-18 组/周','蹲B：30m冲刺维持；1000米隔周','按体重自动换算 · 蛋白 ~2.1g/kg'],
    ['塑形·冲刺期','W37-46','6练/周（推拉蹲×2）+周日恢复','主项 3×3-4，强度优先','低容量：每肌群约 8-12 组/周','恢复1000米体测专项','按体重自动换算 · 蛋白 ~2.1g/kg'],
  ];
  const allocEl=document.getElementById('phaseAlloc');
  if(allocEl)allocEl.innerHTML='<tr><th>阶段</th><th>周次</th><th>频率</th><th>主项组数×次数</th><th>容量</th><th>体能</th><th>饮食</th></tr>'+
    alloc.map(r=>'<tr>'+r.map(c=>'<td>'+esc(c)+'</td>').join('')+'</tr>').join('');
  const cur=weekOf(new Date());
  document.getElementById('weekPicker').innerHTML=Array.from({length:TOTAL_WEEKS},(_,i)=>i+1).map(w=>
    '<button data-wk="'+w+'" class="'+(w===selWeek?'active':'')+(w===cur?' current':'')+'">'+w+'</button>').join('');
  renderWeekDetail();
}
function renderWeekDetail(){
  const wk=buildWeek(selWeek);
  document.getElementById('weekDetail').innerHTML='<div class="card"><div class="card-title">'+esc(wk.label)+' · 小周期第 '+wkInBlock(selWeek)+' 周</div>'+
    '<div class="hint" style="margin-bottom:10px">'+esc(phaseGoalNote(selWeek))+'</div>'+
    wk.days.map(day=>'<div class="day-block"><div class="day-head">'+esc(day.name)+'（'+WD[day.date.getDay()]+' '+day.date.getMonth()+1+'/'+day.date.getDate()+'）· 约 '+day.duration+' 分钟</div>'+
      '<div class="day-body">'+day.items.map(it=>'<div class="ex-item"><div class="ex-main"><div class="ex-name">'+esc(it.name)+'</div><div class="ex-meta">'+esc(it.sets)+' · '+esc(it.load)+(it.rest&&it.rest!=='—'?' · <span class="rest">'+esc(it.rest)+'</span>':'')+'</div></div></div>').join('')+'</div></div>').join('')+
    '</div>';
}

/* ================= 渲染：饮食 ================= */
function macroBlockHTML(m){
  return '<div class="macro-block">'+
    '<div class="macro-row"><span>热量</span><b>'+m.kcal+' kcal</b></div>'+
    '<div class="macro-row"><span>碳水</span><b>'+m.c+' g</b></div>'+
    '<div class="macro-row"><span>蛋白质</span><b>'+m.p+' g</b></div>'+
    '<div class="macro-row"><span>脂肪</span><b>'+m.f+' g</b></div>'+
    '</div>'+
    '<div class="hint" style="margin-top:8px">按最近记录体重 '+(m.kg||70)+'kg 自动换算（未记录暂按 70kg）。不推荐固定餐单：每天盯住热量 + 碳水 / 蛋白质 / 脂肪四个数字，食物自由搭配，蛋白质优先保证。</div>';
}
function renderDiet(){
  const cur=weekOf(new Date()),p=phaseOf(cur);
  document.getElementById('dietRotation').innerHTML=Array.from({length:TOTAL_WEEKS},(_,i)=>i+1).map(w=>
    '<span class="'+(w===cur?'on':'')+'" title="第 '+w+' 周">W'+w+' '+dietTag(w,true)+'</span>').join('');
  document.getElementById('dietTemplates').innerHTML=[1,2,3].map(ph=>
    '<div class="card"><div class="card-title">'+PHASE_NAME[ph]+'</div>'+
    ['A','B','C','REST'].map(k=>{
      const m=macroFor(ph,k);
      return '<div class="sub-card"><div class="sub-title">'+DIET_LABEL[ph][k]+'</div>'+macroBlockHTML(m)+'</div>';
    }).join('')+'</div>').join('');
}

/* ================= 渲染：文献专栏 ================= */
const EVIDENCE=[
  {cat:'主项与辅项关系（为什么这样排）',list:[
    {t:'动作顺序：主项在前，辅项在后',s:'ACSM 2009 立场声明 · Med Sci Sports Exerc',c:'多关节、高技巧、大负荷动作排在课最前，单关节/低负荷辅项放后面，保证主项技术质量与渐进负荷。',u:'每节课：深蹲/卧推/硬拉/引体等主项开头，辅项殿后（跳、侧平举、核心等）。'},
    {t:'主项线性渐进，辅项 RIR 自动调节',s:'Helms 等 2016 · Strength Cond J（RIR-RPE 量表）',c:'主项用固定渐进负荷（RIR 1-2）；辅项按留 2-3 次余力（RIR 2-3）选重量即可，不需要机械每周加重。',u:'辅项统一标注 RIR 2-3 + 阶段参考档位，由你按当天状态自调。'},
    {t:'辅项承担增肌容量与补弱',s:'Schoenfeld 等 2017 · J Sports Sci（容量荟萃）',c:'每肌群每周 10+ 组有效容量是增肌关键；主项负责力量，辅项把容量补齐并针对主项弱点。',u:'主项+辅项合计每肌群约 8-14 组/周（胸/腿偏低端、背/肩偏高端，新手可从 8 组起）；保加利亚/RDL 补深蹲硬拉，侧平举/碎颅者补卧推。'},
    {t:'减载周：主项降量，辅项维持',s:'Bosquet 等 2007 · Med Sci Sports Exerc（减载荟萃）',c:'减载 1-2 周提升后续表现；减载期主项降重降量，辅项保持轻量或减半维持技术。',u:'每 4 周减载：主项降 5kg，辅项轻量高次或减半，恢复优先。'},
  ]},
  {cat:'周期化训练（计划骨架）',list:[
    {t:'周期化训练优于非周期化（荟萃分析）',s:'Rhea & Alderman 2004 · Res Q Exerc Sport',c:'系统性比较后，周期化（按阶段安排强度/容量）的力量增长显著优于一成不变的计划。',u:'46 周拆成 3 个中周期（减脂16 → 增肌20 → 塑形10），每个中周期再拆成 4 周小周期，第 4 周减载。'},
    {t:'渐进超负荷与计划变量',s:'ACSM 2009 立场声明 · Med Sci Sports Exerc',c:'渐进增加负荷/容量是力量增长的核心；同一重量练到力竭收益有限且恢复代价高。',u:'主项每 4 周一个加载块，块内每周 +2.5kg，减载周主动降重 5kg，练前留 RIR 1-2。'},
    {t:'大/中/小周期嵌套',s:'Bompa & Haff《Periodization》',c:'大周期由中周期组成、中周期由小周期组成，阶段目标不同、训练变量随之切换。',u:'先减脂期（容量高、强度中）→ 增肌期（容量与强度并进）→ 塑形期（强度高、容量低）。'},
    {t:'强度分区与速度丢失',s:'Zatsiorsky & Kraemer《Science and Practice of Strength Training》',c:'主项重量应落在明确强度区；组间速度明显变慢说明接近力竭，收益下降。',u:'主项以 3-6RM 强度区为主，速度掉 20% 即停组，不硬顶。'},
  ]},
  {cat:'力量与增肌（肌肉大且好用）',list:[
    {t:'大重量 vs 中等重量的力量与增肌',s:'Schoenfeld 等 2017 · J Strength Cond Res（系统综述+荟萃）',c:'接近力竭时中低重量也能增肌，但最大力量增长仍以大重量（≥80%1RM）更优。',u:'主项卧推/深蹲/硬拉走大重量路线，辅助动作走中重量高次数，兼顾力量和围度。'},
    {t:'每周训练容量与增肌剂量关系',s:'Schoenfeld 等 2017 · J Sports Sci（荟萃）',c:'每肌群每周 10+ 组有效训练，增肌收益随容量上升，但新手 6-8 组也有效。',u:'四天分化：胸/背/腿/肩每周 2 次刺激，主项+辅助合计每肌群约 8-14 组，随阶段递增。'},
    {t:'组间休息时长',s:'Grgic 等 2018 · Sports Med（荟萃）',c:'复合大重量动作组间休 3-5 分钟，力量收益优于短间歇。',u:'主项与爆发/高拉统一休 3-5 分钟，辅助 60-90 秒，已写进每组的休息提示。'},
    {t:'自然训练者的频率与容量',s:'Schoenfeld 等 2016 · J Sports Sci（频率荟萃）；Helms 等 2014 · JISSN',c:'自然训练者建议每肌群每周 2 次左右刺激、容量渐进，比单次练到瘫更有效。',u:'四天分化覆盖全身 2 次/周；侧平举并入上肢日作为肩部发展的一部分。'},
  ]},
  {cat:'爆发力与运动表现（好用）',list:[
    {t:'力量是爆发力的基础',s:'Suchomel, Nimphius & Stone 2016 · Sports Med',c:'最大力量水平决定爆发力的天花板；先涨力量，爆发动作才有效。',u:'前 16 周（减脂·技术期）以深蹲硬拉打底，跳跃/摆荡只做技术，不冲重量。'},
    {t:'爆发力需要重负荷+快速动作结合',s:'Cormie, McGuigan & Newton 2011 · Sports Med',c:'纯重负荷或纯轻快速都无法最大化爆发力，两者结合最优。',u:'每周力量日配跳箱/蹲跳，高拉日单独做爆发，形成"重-快"组合。'},
    {t:'跳深/跳箱的弹跳增益',s:'Markovic 2007 · Br J Sports Med（荟萃）',c:'跳深、跳箱等增强式训练每周 2-3 次可显著提升垂直弹跳。',u:'计划内跳跃动作每周 2-4 次，随阶段从跳箱→跳深→负重蹲跳递进。'},
    {t:'髋铰链爆发动作（摆荡类）',s:'NSCA《体能训练精要》第4版（专著）',c:'壶铃/哑铃摆荡以髋部爆发伸髋为主，是速度-力量训练的有效功能性动作。',u:'蹲B用哑铃摆荡承担髋部爆发功能，蹲A保留跳深/跳箱，前蹲同步打底。'},
    {t:'爆发力训练的组合策略',s:'Tricoli 等 2005 · J Strength Cond Res',c:'爆发类（举重/跳跃/摆荡）与跳跃训练均能显著提升垂直跳与冲刺表现。',u:'蹲A=跳深/跳箱 + 蹲B=摆荡/冲刺，两种刺激并存，不偏科。'},
  ]},
  {cat:'营养与身体成分（减脂/增肌/塑形）',list:[
    {t:'蛋白质与增肌增益上限',s:'Morton 等 2018 · Br J Sports Med（荟萃）',c:'蛋白摄入与增肌收益在约 1.6g/kg/天达到平台，超出部分的额外增益证据有限。',u:'各期蛋白 140-150g/天（≈2g/kg）；1.6g/kg 已达证据平台，减脂/塑形期取 2.0-2.1g/kg 属于保险剂量。'},
    {t:'蛋白质时间窗 vs 全天总量',s:'Schoenfeld, Aragon & Krieger 2013 · JISSN（荟萃）',c:'全天蛋白总量比"练后 30 分钟窗口"更重要，分 4-5 餐每餐约 0.4g/kg。',u:'饮食模板固定 4-5 餐，每餐蛋白 25-50g，训练日练前加餐已内置。'},
    {t:'减脂期保肌肉',s:'Cava 等 2017 · Adv Nutr；Helms 等 2014 · JISSN',c:'热量缺口 + 高蛋白 + 力量训练，可在减脂同时保留肌肉；建议每周减重 0.5-1% 体重。',u:'减脂期每周目标 0.4-0.5kg（≈0.6% 体重），力量训练不停，蛋白 2g/kg。'},
    {t:'能量缺口与体重的定量关系',s:'Hall 等 2011 · Lancet',c:'体重变化由能量缺口决定，久坐人群基础消耗偏低，缺口不宜过大。',u:'按久坐 TDEE≈2040 计算，减脂缺口 300-400 大卡；训练日加餐另计，多动自己加。'},
  ]},
  {cat:'恢复与睡眠',list:[
    {t:'睡眠与运动表现',s:'Fullagar 等 2015 · Sports Med（荟萃）',c:'睡眠 <7 小时显著损害力量、爆发力和恢复。',u:'23:30 前入睡、睡 7-8 小时，训练日和休息日同等重要。'},
    {t:'减载与表现提升',s:'Bosquet 等 2007 · Med Sci Sports Exerc（荟萃）',c:'赛前/阶段末减载 1-2 周可提升表现 2-6%。',u:'每 4 周小减载：主项回落到小周期起始重量（较峰值 -5kg）、次数下调；阶段切换时下一阶段起始重量从上一阶段峰值附近重新起步，避免重量断层。'},
  ]},
  {cat:'身体成分与目标设定（为什么是这个终点）',list:[
    {t:'上肢力量线索主导男性身体吸引力',s:'Sell 等 2017 · Proc R Soc B',c:'上肢力量线索解释男性身体吸引力评分 70-80% 的方差。',u:'计划以力量为主目标，肌肉围度是力量训练的副产品，不是单独追求。'},
    {t:'体脂 12-15% 与肩腰比 1.6 最优',s:'2025 · Personality and Individual Differences（中国/立陶宛/英国，DXA 实测）',c:'身体照片评分中体脂约 12-14% 最受欢迎，肩腰比 1.6 为峰值。',u:'阶段终点：体脂 12-14%、腰围 74-76cm、肩围 118-122cm。'},
    {t:'中等偏上肌肉量最受欢迎',s:'Frederick & Haselton 2007 · PSPB',c:'肌肉量呈倒 U 曲线，中等偏上最优，过度健美反而下降。',u:'目标"大且好用"：达到力量标准即止，不追求比赛级维度。'},
  ]},
];
function renderEvidence(){
  document.getElementById('evidenceList').innerHTML=EVIDENCE.map(g=>
    '<div class="card"><div class="card-title">'+esc(g.cat)+'</div>'+
    g.list.map(e=>'<div class="ev-item"><div class="ev-title">'+esc(e.t)+'</div>'+
      '<div class="ev-src">'+esc(e.s)+'</div>'+
      '<div class="ev-concl"><span class="ev-label">结论</span>'+esc(e.c)+'</div>'+
      '<div class="ev-use"><span class="ev-label">在计划里</span>'+esc(e.u)+'</div></div>').join('')+
    '</div>').join('');
}

/* ================= 渲染：身体 ================= */
const WT_END_WK=16, WT_END_KG=66;
function bodyTargetHTML(){
  const sorted=body.slice().sort((a,b)=>a.date<b.date?-1:1);
  const recs=sorted.filter(b=>b.weight);
  const start=recs.length?Number(recs[0].weight):70;
  const wk=Math.max(1,Math.min(weekOf(new Date()),TOTAL_WEEKS));
  const plan=start-(start-WT_END_KG)*Math.max(wk-1,0)/Math.max(WT_END_WK-1,1);
  const last=recs.length?recs[recs.length-1]:null;
  let diffHtml='<div class="hint">记录体重后自动对比</div>',forecastHtml='';
  if(last){
    const diff=Number(last.weight)-plan;
    const color=diff>0.3?'#C00000':(diff<-0.3?'#2E7D32':'#666');
    diffHtml='<div style="margin-top:6px;color:'+color+'">最近记录 '+last.weight+'kg（'+last.date+'） · '+(diff>0?'落后':'超前')+' '+Math.abs(diff).toFixed(1)+'kg'+(diff>0?'，本周需多减 '+Math.abs(diff).toFixed(1)+'kg 才能跟上计划':'，进度良好')+'</div>';
  }
  if(recs.length>=2){
    const a=recs[recs.length-2],b=recs[recs.length-1];
    const days=(Date.parse(b.date)-Date.parse(a.date))/86400000;
    const wks=Math.max(days/7,0.5);
    const rate=(Number(b.weight)-Number(a.weight))/wks;
    const remain=Math.max(WT_END_WK-wk,0);
    const f=Number(b.weight)+rate*remain;
    forecastHtml='<div class="hint" style="margin-top:6px">按当前速度（每周 '+rate.toFixed(2)+'kg），W'+WT_END_WK+' 预计 '+Math.round(f*10)/10+'kg'+(f>WT_END_KG+0.5?'，偏慢，需收紧饮食':'，符合/快于计划')+'</div>';
  }
  return '<div style="font-size:20px;font-weight:700;color:#1F4E79">本周应有体重 '+Math.round(plan*10)/10+'kg <small style="font-size:12px;font-weight:400;color:#666">（第 '+wk+' 周 · 目标 W'+WT_END_WK+' → '+WT_END_KG+'kg，从周一起算）</small></div>'+diffHtml+forecastHtml;
}
function renderBody(){
  const tEl=document.getElementById('bodyTarget');
  if(tEl)tEl.innerHTML=bodyTargetHTML();
  const sorted=body.slice().sort((a,b)=>a.date<b.date?-1:1);
  document.getElementById('bodyList').innerHTML=sorted.slice(-6).reverse().map(b=>'<span>'+b.date+'  '+b.weight+'kg / '+b.waist+'cm'+(b.shoulder?' / '+b.shoulder+'cm':'')+'</span>').join('')||'<span class="hint">暂无记录</span>';
  const wpts=sorted.filter(b=>b.weight).map(b=>b.weight),wlab=sorted.filter(b=>b.weight).map(b=>b.date.slice(5));
  const apts=sorted.filter(b=>b.waist).map(b=>b.waist),alab=sorted.filter(b=>b.waist).map(b=>b.date.slice(5));
  drawChart(document.getElementById('bodyChart'),[
    {points:wpts,labels:wlab,color:'#1F4E79'},
    {points:apts,labels:alab,color:'#70AD47'},
  ]);
  const lift=document.getElementById('liftSelect').value;
  const pts=[],lab=[];
  Object.keys(logs).sort().forEach(k=>{if(logs[k].lifts&&logs[k].lifts[lift]!=null){pts.push(logs[k].lifts[lift]);lab.push(k.slice(5));}});
  drawChart(document.getElementById('liftChart'),[{points:pts,labels:lab,color:'#2E75B6'}]);
  // 动作重量记录（主项/辅项通用）
  const exSel=document.getElementById('exWeightSelect');
  if(exSel){
    const wk=Math.max(1,Math.min(weekOf(new Date()),TOTAL_WEEKS));
    const seen={},opts=[];
    window.__liftMap={};
    buildWeek(wk).days.forEach(d=>d.items.forEach(it=>{
      if(!canRecordWeight(it.name))return;
      if(it.lift)window.__liftMap[it.name]=it.lift;
      if(!seen[it.name]){seen[it.name]=1;opts.push(it.name);}
    }));
    const sel=exSel.value&&opts.indexOf(exSel.value)>=0?exSel.value:opts[0]||'';
    exSel.innerHTML=opts.map(o=>'<option'+(o===sel?' selected':'')+'>'+esc(o)+'</option>').join('');
    updateExWtInfo();
  }
}
function updateExWtInfo(){
  const sel=document.getElementById('exWeightSelect'),info=document.getElementById('exWeightInfo'),listEl=document.getElementById('exWeightList');
  if(!sel||!info)return;
  const name=sel.value;
  if(!name){info.textContent='本周计划里没有可选动作，先到「今日/计划」页看看。';listEl.innerHTML='';return;}
  const cur=logs[todayKey]&&logs[todayKey].exWts&&logs[todayKey].exWts[name];
  const last=lastExWeight(name,todayKey);
  info.textContent='「'+name+'」'+(cur!=null?(' 本次已记录：'+cur+'kg'):(last?(' 上次：'+last.w+'kg（'+fmtShort(last.d)+'）'):' 暂无记录'));
  const hist=[];
  Object.keys(logs).sort().forEach(k=>{const lg=logs[k];if(lg&&lg.exWts&&lg.exWts[name]!=null)hist.push({d:k,w:lg.exWts[name]});});
  listEl.innerHTML=hist.slice(-6).reverse().map(h=>'<span>'+h.d.slice(5)+' '+h.w+'kg</span>').join('')||'<span class="hint">暂无记录</span>';
}

/* ================= 导出 / 导入 ================= */
function exportData(){
  const data={settings,logs,body,exportedAt:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='洋芋训练数据-'+todayKey+'.json';a.click();
  URL.revokeObjectURL(a.href);
}
function importData(file){
  const fr=new FileReader();
  fr.onload=()=>{
    try{
      const d=JSON.parse(fr.result);
      if(d.settings)settings=Object.assign({},d.settings);
      if(d.logs)logs=d.logs;
      if(d.body)body=d.body;
      save(LS.settings,settings);save(LS.logs,logs);save(LS.body,body);
      alert('导入成功');render();
    }catch(e){alert('文件格式不对，导入失败');}
  };
  fr.readAsText(file);
}
function copyLog(){
  const now=new Date(),d=day0(now),wk=weekOf(d),dow=d.getDay(),key=fmt(d),L=logFor(key);
  const isTrain=(dow===1||dow===2||dow===4||dow===5),p=phaseOf(wk),tag=dietTag(wk,isTrain),m=macroFor(p,tag);
  let md='# '+key+' 训练日志\n\n## 今日状态\n- 周次：第 '+wk+' 周 · '+PHASE_NAME[p]+'（小周期第 '+wkInBlock(wk)+' 周）\n';
  const bw=body.find(b=>b.date===key);
  md+='- 体重/腰围/肩围：'+(bw?(bw.weight+'kg / '+(bw.waist||'-')+'cm / '+(bw.shoulder||'-')+'cm'):'未记录')+'\n\n## 训练\n';
  if(isTrain){
    const di=todayIdx(dow);
    buildDay(wk,di).items.forEach(it=>{
      const total=parseSets(it.sets);
      const sd=total>0?((L.sets&&L.sets[it.name])||0):(L.work[it.name]?1:0);
      md+='- ['+(L.work[it.name]?'x':' ')+'] '+it.name+' '+it.sets+' '+it.load+(total>0?'（'+sd+'/'+total+'组）':'')+(it.rest&&it.rest!=='—'?'（'+it.rest+'）':'')+'\n';
    });
  }else md+='- 休息日\n';
  md+='\n## 饮食（'+DIET_LABEL[p][tag]+' · '+m.kcal+'kcal｜P'+m.p+'｜F'+m.f+'｜C'+m.c+'）\n';
  md+='\n## 小结\n- 今天状态：'+(isTrain?'完成训练并按要求饮食':'休息日恢复')+'\n';
  const ta=document.createElement('textarea');ta.value=md;document.body.appendChild(ta);ta.select();
  let ok=false;
  try{ok=document.execCommand('copy');}catch(e){ok=false;}
  document.body.removeChild(ta);
  if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(md).then(()=>flash('已复制到剪贴板')).catch(()=>flash(ok?'已复制到剪贴板':'复制失败'));}
  else flash(ok?'已复制到剪贴板':'复制失败');
}
function flash(msg){const el=document.getElementById('todayLine');if(el){el.textContent=msg;setTimeout(()=>renderToday(),2500);}}

/* ================= 事件 ================= */
function bindEvents(){
  document.querySelectorAll('nav#bottomNav button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelectorAll('nav#bottomNav button').forEach(x=>x.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
    b.classList.add('active');document.getElementById('tab-'+b.dataset.tab).classList.add('active');
    if(b.dataset.tab==='body'){document.getElementById('bodyDate').value=todayKey;renderBody();}
    if(b.dataset.tab==='diet')renderDiet();
    if(b.dataset.tab==='plan')renderPlan();
    if(b.dataset.tab==='evidence')renderEvidence();
  }));
  document.addEventListener('change',e=>{
    if(e.target.matches('input[data-ex]')){
      const key=todayKey,L=logFor(key),name=e.target.dataset.ex;
      L.work[name]=e.target.checked;
      L.sets=L.sets||{};
      const day=todayDay();
      const total=day?parseSets((day.items.find(i=>i.name===name)||{}).sets):0;
      if(e.target.checked){L.sets[name]=total>0?total:1;}
      else{L.sets[name]=0;}
      if(e.target.checked&&e.target.dataset.main==='1'){
        const lift=e.target.dataset.lift,w=parseLoad(e.target.dataset.load);
        if(lift&&w>0){L.lifts=L.lifts||{};L.lifts[lift]=w;}
      }
      persist();render();
    }
    if(e.target.matches('#exWeightSelect'))updateExWtInfo();
  });
  document.addEventListener('click',e=>{
    const key=todayKey,L=logFor(key);
    if(e.target.matches('.set-btn')){
      const name=e.target.dataset.set,total=parseInt(e.target.dataset.total,10);
      L.sets=L.sets||{};
      const cur=L.sets[name]||0;
      if(cur<total){
        L.sets[name]=cur+1;
        if(L.sets[name]>=total){
          L.work[name]=true;
          const day=todayDay();
          const it=day&&day.items.find(x=>x.name===name);
          if(it&&it.main&&it.lift){const w=parseLoad(it.load);if(w>0){L.lifts=L.lifts||{};L.lifts[it.lift]=w;}}
        }
        persist();render();
      }
      return;
    }
    if(e.target.matches('.wt-btn')){
      const lift=e.target.dataset.lift,name=e.target.dataset.name;
      const inp=prompt('记录「'+name+'」本次重量(kg)：');
      const w=parseFloat(inp);
      if(w>0){
        L.exWts=L.exWts||{};L.exWts[name]=w;
        if(lift){L.lifts=L.lifts||{};L.lifts[lift]=w;}
        persist();render();
      }
      return;
    }
    if(e.target.matches('.undo-btn')){
      const name=e.target.dataset.undo;
      L.sets=L.sets||{};
      const cur=L.sets[name]||0;
      if(cur>0){
        L.sets[name]=cur-1;
        const day=todayDay();
        const total=day?parseSets((day.items.find(i=>i.name===name)||{}).sets):0;
        if((L.sets[name]||0)<total){L.work[name]=false;}
        persist();render();
      }
      return;
    }
    if(e.target.matches('#bodySave')){
      const date=document.getElementById('bodyDate').value||todayKey;
      const weight=parseFloat(document.getElementById('bodyWeight').value);
      const waist=parseFloat(document.getElementById('bodyWaist').value);
      const shoulder=parseFloat(document.getElementById('bodyShoulder').value);
      if(!weight&&!waist&&!shoulder){alert('请填写体重、腰围或肩围');return;}
      const rec={date:date,weight:weight||null,waist:waist||null,shoulder:shoulder||null};
      const idx=body.findIndex(b=>b.date===date);
      if(idx>=0)body[idx]=rec;else body.push(rec);
      save(LS.body,body);document.getElementById('bodyWeight').value='';document.getElementById('bodyWaist').value='';document.getElementById('bodyShoulder').value='';renderBody();
    }
    if(e.target.matches('#dailyWeightSave')){
      const w=parseFloat(document.getElementById('dailyWeightInput').value);
      if(!w){alert('请填写体重');return;}
      const rec={date:todayKey,weight:w,waist:null,shoulder:null};
      const idx=body.findIndex(b=>b.date===todayKey);
      if(idx>=0){rec.waist=body[idx].waist;rec.shoulder=body[idx].shoulder;body[idx]=rec;}else body.push(rec);
      save(LS.body,body);render();
    }
    if(e.target.matches('#exWeightSave')){
      const name=document.getElementById('exWeightSelect').value;
      const w=parseFloat(document.getElementById('exWeightInput').value);
      if(!name){alert('请先选择动作');return;}
      if(!w||w<=0){alert('请输入有效重量');return;}
      const L=logFor(todayKey);
      L.exWts=L.exWts||{};L.exWts[name]=w;
      const lm=window.__liftMap||{};
      if(lm[name]){L.lifts=L.lifts||{};L.lifts[lm[name]]=w;}
      persist();render();
      document.getElementById('exWeightInput').value='';
      alert('已记录「'+name+'」'+w+'kg');
    }
    if(e.target.matches('#exportBtn'))exportData();
    if(e.target.matches('#copyLogBtn'))copyLog();
    if(e.target.matches('#resetBtn')){
      if(confirm('确定清空全部数据？此操作不可恢复（建议先导出备份）。')){
        localStorage.removeItem(LS.settings);localStorage.removeItem(LS.logs);localStorage.removeItem(LS.body);
        settings={};logs={};body=[];
        render();flash('数据已清空');
      }
    }
    if(e.target.matches('#weekPicker button')){
      selWeek=parseInt(e.target.dataset.wk,10);renderPlan();
    }
  });
  document.getElementById('importFile').addEventListener('change',e=>{if(e.target.files[0])importData(e.target.files[0]);e.target.value='';});
}

/* ================= 启动 ================= */
function render(){
  renderToday();renderPlan();renderDiet();renderBody();renderEvidence();
}
document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('bodyDate').value=todayKey;
  bindEvents();render();
  if(location.protocol==='http:'||location.protocol==='https:'){
    if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js').catch(()=>{});}
  }
});
