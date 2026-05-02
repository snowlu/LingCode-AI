const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const randDate = (start, end) => {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return d.toISOString().split('T')[0]
}
const randPhone = () => `1${pick([3,5,7,8,9])}${randInt(100000000, 999999999)}`

const surnames = ['张','李','王','赵','刘','陈','杨','黄','周','吴','徐','孙','马','朱','胡','郭','林','何','高','罗','郑','梁','谢','宋','唐','韩','冯','董','萧','程','曹','袁','邓','许','傅','沈','曾','彭','吕','苏','卢','蒋','蔡','贾','丁','魏','薛','叶','阎','余','潘','杜','戴','夏','钟','汪','田','任','姜','范','方','石','姚','谭','廖','邹','熊','金','陆','郝','孔','白','崔','康','毛','邱','秦','江','史','顾','侯','邵','孟','龙','万','段','雷','钱','汤','尹','黎','易','常','武','乔','贺','赖','龚','文']
const maleNames = ['伟','强','磊','军','勇','杰','涛','明','超','华','飞','刚','平','辉','鹏','志','浩','宇','博','文','建','国','斌','峰','龙','旭','凯','晨','天','达','亮','成','睿','昊','翔','泽','嘉','瑞','恒']
const femaleNames = ['芳','娜','敏','静','丽','秀','娟','英','华','慧','巧','美','婷','玉','萍','红','玲','桂','珍','莲','雪','梅','琳','云','兰','凤','洁','莉','霜','月','霞','花','香','燕','春','蓉']
const cities = ['北京','上海','广州','深圳','杭州','成都','武汉','南京','重庆','西安','苏州','天津','长沙','郑州','东莞','青岛','沈阳','宁波','昆明','大连']
const districts = ['朝阳区','海淀区','浦东新区','天河区','南山区','西湖区','武侯区','江汉区','鼓楼区','渝中区','姑苏区','河西区','岳麓区','金水区','虎门镇','崂山区','和平区','鄞州区','盘龙区','甘井子区']

const genName = () => pick(surnames) + pick(Math.random() > 0.5 ? maleNames : femaleNames)
const genAddress = () => `${pick(cities)}市${pick(districts)}${pick(['中心路','建设街','科技大道','人民路','长安街'])}${randInt(1,200)}号`

function generateEcommerce() {
  const productNames = ['iPhone 15 Pro','MacBook Air M3','AirPods Pro 2','iPad Mini 6','Apple Watch S9','HomePod Mini','小米14 Ultra','华为Mate 60 Pro','OPPO Find X7','vivo X100 Pro','三星 Galaxy S24','索尼 WH-1000XM5','戴森 V15 吸尘器','飞利浦电动牙刷','任天堂 Switch','PS5 主机','联想 ThinkPad X1','Surface Pro 9','大疆 Mini 4 Pro','GoPro Hero 12','Bose 降噪耳机','JBL 蓝牙音箱','Kindle Paperwhite','机械键盘 K8','罗技 MX Master 3','小米电视 65寸','海尔冰箱','美的空调','格力电暖器','九阳豆浆机']
  const categories = ['手机数码','电脑办公','家用电器','服饰鞋包','美妆护肤','食品生鲜','图书文具','运动户外']
  const statuses = ['在售','在售','在售','在售','在售','缺货','下架']

  const products = productNames.map((name, i) => ({
    id: i + 1, name, price: randInt(50, 15000), originalPrice: randInt(100, 18000),
    category: pick(categories), sales: randInt(100, 80000), stock: randInt(0, 500),
    status: pick(statuses), img: pick(['📱','💻','🎧','📟','⌚','🔊','🎮','🖥️','📷','🎵','📺','❄️','☕','📚','⚽']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const orderStatuses = ['待支付','待发货','已发货','已签收','已完成','已取消','已退款']
  const orders = Array.from({ length: 30 }, (_, i) => ({
    id: 1001 + i, product: pick(productNames), customer: genName(),
    amount: randInt(50, 15000), status: pick(orderStatuses),
    phone: randPhone(), address: genAddress(),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const afterSales = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, orderNo: 'ORD' + (20260001 + randInt(0, 30)), type: pick(['退货','换货','维修']),
    customer: genName(), status: pick(['待审核','处理中','已完成','已拒绝']),
    reason: pick(['质量问题','不想要了','尺寸不符','商品损坏','与描述不符']),
    amount: randInt(50, 8000), createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const refunds = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, orderNo: 'ORD' + (20260001 + randInt(0, 30)), amount: randInt(50, 10000),
    reason: pick(['不想要了','质量问题','尺寸不符','发错货','商品损坏']),
    status: pick(['审核中','已退款','已拒绝','已退款','已退款']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const members = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, username: genName(), email: `user${i + 1}@example.com`,
    role: pick(['VIP会员','普通会员','钻石会员','黄金会员']),
    phone: randPhone(), points: randInt(100, 50000), status: pick(['正常','正常','正常','冻结']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const levels = [
    { id: 1, name: '普通会员', minPoints: 0, discount: '9.5折', members: randInt(500, 2000), status: '启用' },
    { id: 2, name: '白银会员', minPoints: 3000, discount: '9.0折', members: randInt(200, 800), status: '启用' },
    { id: 3, name: '黄金会员', minPoints: 8000, discount: '8.5折', members: randInt(100, 400), status: '启用' },
    { id: 4, name: '钻石会员', minPoints: 15000, discount: '8.0折', members: randInt(30, 150), status: '启用' }
  ]

  const coupons = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: pick(['新人专享券','满减券','折扣券','品类券','限时券']),
    amount: pick([10, 20, 50, 100, 200]), condition: pick(['满100可用','满200可用','满500可用','无门槛']),
    claimed: randInt(100, 3000), total: randInt(2000, 10000),
    status: pick(['进行中','进行中','进行中','已结束','未开始']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const promotions = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1, name: pick(['新年大促','春节特惠','38节活动','五一狂欢','618预售','双11预热','会员日','周年庆']),
    rule: pick(['满300减50','满500减100','满1000减200','全场8折','买2免1']),
    startDate: randDate(new Date('2026-01-01'), new Date('2026-06-01')),
    endDate: randDate(new Date('2026-06-01'), new Date('2026-12-31')),
    status: pick(['进行中','进行中','未开始','已结束']),
    createdAt: randDate(new Date('2025-12-01'), new Date('2026-04-30'))
  }))

  const inventory = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: pick(productNames), warehouse: pick(['北京仓','上海仓','深圳仓','广州仓','成都仓']),
    stock: randInt(10, 500), alertValue: pick([30, 50, 80, 100]),
    status: pick(['正常','正常','正常','预警','缺货']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const categoryTree = categories.map((cat, i) => ({
    id: i + 1, name: cat, parentId: 0, sort: i + 1,
    productCount: randInt(50, 500), status: '启用',
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  return {
    ecommerce_productList: products,
    ecommerce_category: categoryTree,
    ecommerce_inventory: inventory,
    ecommerce_orderList: orders,
    ecommerce_afterSale: afterSales,
    ecommerce_refund: refunds,
    ecommerce_memberList: members,
    ecommerce_level: levels,
    ecommerce_coupon: coupons,
    ecommerce_promotion: promotions
  }
}

function generateEducation() {
  const courseNames = ['Vue3全栈开发实战','Python数据分析入门','React进阶实战指南','AI大模型应用开发','Node.js微服务架构','UI设计从入门到精通','Java Spring Boot实战','Flutter移动端开发','Go语言高并发编程','Docker与K8s实战','TypeScript高级编程','MySQL性能优化','Redis缓存实战','Linux运维入门','网络安全基础','产品经理实战课','数据分析与可视化','深度学习入门','区块链开发基础','微信小程序开发']
  const categories = ['前端开发','后端开发','人工智能','产品设计','数据分析','移动开发','运维安全','职业考试']
  const teachers = surnames.slice(0, 15).map(s => `${s}老师`)

  const courses = courseNames.map((name, i) => ({
    id: i + 1, name, price: randInt(99, 499), originalPrice: randInt(199, 999),
    category: pick(categories), teacher: pick(teachers), students: randInt(500, 30000),
    hours: pick([24, 32, 48, 64, 96, 128]), status: pick(['上架','上架','上架','下架']),
    img: pick(['📘','📗','📕','📙','🤖','🎨','💻','⚙️','📊','📱']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const students = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), email: `student${i + 1}@edu.com`,
    course: pick(courseNames), progress: randInt(0, 100), status: pick(['学习中','学习中','已完成','未开始']),
    phone: randPhone(), createdAt: randDate(new Date('2025-09-01'), new Date('2026-04-30'))
  }))

  const studentArchives = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), enrollDate: randDate(new Date('2023-09-01'), new Date('2026-03-01')),
    duration: pick(['2年','3年','4年']), major: pick(['计算机','英语','数学','物理','金融','设计','管理','电子工程']),
    status: pick(['在读','在读','在读','已毕业','休学']),
    createdAt: randDate(new Date('2023-09-01'), new Date('2026-04-30'))
  }))

  const teacherList = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: `${pick(surnames)}老师`, title: pick(['讲师','副教授','教授','高级讲师']),
    specialty: pick(categories), rating: (4 + Math.random()).toFixed(1),
    students: randInt(1000, 50000), courses: randInt(2, 15),
    status: pick(['在岗','在岗','在岗','休假']),
    createdAt: randDate(new Date('2024-01-01'), new Date('2026-04-30'))
  }))

  const schedules = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, course: pick(courseNames), teacher: pick(teachers),
    classroom: pick(['A301','B205','A401','C102','B310','A201','C405']),
    weekday: pick(['周一','周二','周三','周四','周五']),
    period: pick(['1-2节','3-4节','5-6节','7-8节']),
    weeks: pick(['1-16周','1-12周','1-18周']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const exams = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, course: pick(courseNames), date: randDate(new Date('2026-06-01'), new Date('2026-07-15')),
    classroom: pick(['A301','B205','A401','C102']), supervisor: pick(teachers),
    status: pick(['未开始','未开始','进行中','已结束']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const coursewares = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: pick(['基础入门','进阶实战','高级专题','项目实战','面试宝典']) + '-' + pick(['第1章','第2章','第3章','第4章','第5章']),
    course: pick(courseNames), format: pick(['PDF','PPT','视频','文档']),
    size: `${randInt(2, 50)}MB`, status: pick(['已发布','已发布','审核中']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const homeworks = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, title: pick(['组件开发','数据处理','接口联调','页面布局','性能优化','单元测试','部署上线']) + '作业',
    course: pick(courseNames), deadline: randDate(new Date('2026-02-01'), new Date('2026-06-30')),
    submitted: randInt(20, 60), total: randInt(40, 80),
    status: pick(['进行中','进行中','已截止','未开始']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    education_studentList: students,
    education_studentArchive: studentArchives,
    education_courseList: courses,
    education_teacherArchive: teacherList,
    education_schedule: schedules,
    education_exam: exams,
    education_courseware: coursewares,
    education_homework: homeworks
  }
}

function generateGovernment() {
  const itemNames = ['营业执照申请','户口迁移办理','社保转移接续','居住证办理','公积金提取','不动产登记','身份证换领','护照办理','驾驶证换证','婚姻登记','出生证明办理','个体工商户注册','食品经营许可','卫生许可证','建筑许可','环保审批','消防审批','税务登记','社保补缴','居住证签注']
  const categories = ['工商注册','户政办理','社保服务','税务服务','公积金','交通出行','医疗卫生','教育服务']
  const departments = ['市场监管局','公安局','人社局','税务局','公积金中心','交通局','卫健委','教育局']

  const items = itemNames.map((name, i) => ({
    id: i + 1, name, category: pick(categories), department: pick(departments),
    duration: `${randInt(1, 15)}工作日`, applicants: randInt(5000, 80000),
    fee: pick(['免费','免费','免费','¥10','¥50']),
    status: pick(['可办理','可办理','可办理','暂停办理']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const pendingApps = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, applicant: genName(), item: pick(itemNames),
    urgency: pick(['普通','普通','紧急']), phone: randPhone(),
    submittedAt: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    status: pick(['待审批','待审批','审批中'])
  }))

  const doneApps = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, applicant: genName(), item: pick(itemNames),
    result: pick(['已通过','已通过','已通过','已驳回']),
    satisfaction: pick(['非常满意','满意','一般','不满意']),
    processedAt: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    status: '已办结'
  }))

  const policies = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, title: `${pick(['关于','关于印发','关于调整'])}${pick(['社保政策','公积金调整','便民服务','网上办事','政务公开','数据安全','营商环境','人才引进','城市更新','数字政府'])}的${pick(['通知','公告','方案','意见'])}`,
    department: pick(departments), views: randInt(500, 10000),
    type: pick(['公告','通知','政策','活动']),
    status: pick(['已发布','已发布','已下架']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const guides = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: pick(itemNames),
    process: pick(['在线申请→审核→领证','申请→审核→迁移','提交→受理→审批→办结']),
    materials: pick(['身份证、场地证明','户口本、房产证','身份证、社保卡','营业执照、法人身份证']),
    duration: `${randInt(1, 10)}工作日`,
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const staff = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: genName(), department: pick(departments),
    position: pick(['科长','科员','窗口人员','主任']),
    approvalLevel: pick(['一级审批','二级审批','仅查看']),
    status: pick(['在岗','在岗','在岗','出差']),
    createdAt: randDate(new Date('2023-01-01'), new Date('2026-04-30'))
  }))

  const permAssigns = [
    { id: 1, role: '科长', count: 5, approval: '一级审批', dataScope: '全部数据', status: '启用' },
    { id: 2, role: '科员', count: 12, approval: '二级审批', dataScope: '本部门数据', status: '启用' },
    { id: 3, role: '窗口人员', count: 8, approval: '仅查看', dataScope: '本业务数据', status: '启用' }
  ]

  return {
    government_itemList: items,
    government_pending: pendingApps,
    government_done: doneApps,
    government_policy: policies,
    government_guide: guides,
    government_staff: staff,
    government_permAssign: permAssigns
  }
}

function generateMedical() {
  const depts = ['心内科','骨科','儿科','妇科','眼科','口腔科','中医科','皮肤科','神经内科','呼吸科','消化科','泌尿科','内分泌科','肿瘤科','急诊科']
  const titles = ['主任医师','副主任医师','主治医师','住院医师']

  const patients = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), gender: pick(['男','女']), age: randInt(1, 85),
    phone: randPhone(), department: pick(depts),
    diagnosis: pick(['感冒','高血压','糖尿病','骨折','胃炎','近视','牙周炎','湿疹','头痛','腰椎间盘突出','甲状腺结节','贫血','过敏性鼻炎','失眠','咳嗽']),
    allergy: pick(['无','无','无','青霉素','磺胺类','头孢类']),
    status: pick(['就诊中','已出院','已出院','复诊']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const doctors = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: `${pick(surnames)}${pick(['主任','医生','教授','专家'])}`,
    department: depts[i % depts.length], title: pick(titles),
    experience: randInt(5, 35), fee: pick([30, 40, 50, 60, 80, 100]),
    rating: (4 + Math.random()).toFixed(1), patients: randInt(5000, 60000),
    status: pick(['出诊','出诊','出诊','休息']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const appointments = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1, patient: genName(),
    doctor: doctors[i % 15].name, department: doctors[i % 15].department,
    date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    time: pick(['上午','下午']), status: pick(['已预约','候诊中','已就诊','已就诊','已取消']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const visitRecords = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, patient: genName(), department: pick(depts),
    doctor: `${pick(surnames)}${pick(['主任','医生'])}`,
    diagnosis: pick(['上呼吸道感染','腰椎间盘突出','高血压','糖尿病','骨折','胃炎','近视','湿疹','头痛','咳嗽']),
    prescription: pick(['阿莫西林+止咳糖浆','布洛芬+膏药','降压药+利尿剂','二甲双胍','石膏固定','奥美拉唑','配镜处方','外用药膏']),
    status: pick(['已完成','已完成','已完成','进行中']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const prescriptions = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1, patient: genName(), doctor: `${pick(surnames)}${pick(['主任','医生'])}`,
    medicine: pick(['阿莫西林+止咳糖浆','布洛芬+膏药','降压药+利尿剂','二甲双胍','奥美拉唑+铝碳酸镁','氯雷他定+维生素C']),
    amount: randInt(30, 300), status: pick(['已取药','已取药','待取药']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const medicines = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: pick(['阿莫西林','布洛芬','头孢克肟','奥美拉唑','氨氯地平','二甲双胍','阿托伐他汀','氯雷他定','蒙脱石散','复方甘草片','连花清瘟','板蓝根','维生素C','钙片','碘伏','创可贴','开瑞坦','泰诺','白加黑','芬必得']),
    category: pick(['处方药','非处方药','中成药','保健品']),
    price: (Math.random() * 100 + 5).toFixed(2), stock: randInt(50, 2000),
    alertValue: pick([100, 150, 200]),
    manufacturer: pick(['国药集团','华润三九','扬子江药业','云南白药','同仁堂','哈药集团','石药集团','齐鲁制药']),
    status: pick(['在售','在售','在售','缺货']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const drugIoRecords = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, type: pick(['入库','出库']), medicine: pick(['阿莫西林','布洛芬','头孢克肟','奥美拉唑','连花清瘟','板蓝根']),
    quantity: randInt(50, 500), operator: pick(['药房管理员','李护士','王药师','张主任']),
    date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    medical_patientArchive: patients,
    medical_registration: appointments,
    medical_visitRecord: visitRecords,
    medical_prescription: prescriptions,
    medical_drugStock: medicines,
    medical_drugIo: drugIoRecords,
    medical_doctorSchedule: doctors
  }
}

function generateLogistics() {
  const types = ['标准快递','特快专递','冷链运输','大件物流','国际快递','同城急送']
  const statuses = ['待取件','运输中','派送中','已签收','已签收','已签收','已退回']

  const orders = Array.from({ length: 40 }, (_, i) => ({
    id: 'WD' + (20260001 + i), sender: pick(cities), receiver: pick(cities),
    type: pick(types), weight: `${(Math.random() * 20 + 0.1).toFixed(1)}kg`,
    fee: randInt(8, 150), status: pick(statuses), customer: genName(),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const trackings = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, waybillId: 'WD' + (20260001 + i * 2),
    location: pick(cities) + pick(['中转站','配送站','分拣中心','集散中心']),
    updateTime: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    estimatedArrival: randDate(new Date('2026-04-01'), new Date('2026-05-30')),
    vehicle: pick(['京A12345','川B67890','沪C11111','粤D22222','浙E33333']),
    status: pick(['运输中','派送中','已签收']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const vehicles = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, plateNumber: pick(['京A12345','川B67890','沪C11111','粤D22222','浙E33333','苏F44444','鲁G55555','豫H66666']),
    type: pick(['重型卡车','中型货车','轻型货车','冷链车','面包车']),
    capacity: pick(['20吨','10吨','5吨','3吨','1吨']),
    driver: genName(), status: pick(['运行中','运行中','运行中','维修中','空闲']),
    inspectionExpiry: randDate(new Date('2026-06-01'), new Date('2027-12-31')),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const dispatches = Array.from({ length: 15 }, (_, i) => ({
    id: 'DS' + (2026001 + i), vehicle: pick(['京A12345','川B67890','沪C11111']),
    driver: genName(), from: pick(cities), to: pick(cities),
    departureTime: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    status: pick(['已发车','已发车','待发车','已到达']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const couriers = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: genName(), phone: randPhone(),
    area: pick(cities), todayDeliveries: randInt(15, 50),
    monthDeliveries: randInt(300, 800), rating: (4 + Math.random()).toFixed(1),
    status: pick(['在岗','在岗','在岗','休息']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const routes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, from: pick(cities), to: pick(cities),
    distance: `${randInt(100, 3000)}km`, estimatedTime: `${randInt(4, 48)}小时`,
    stops: randInt(1, 5), status: pick(['正常','正常','停运']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const inbound = Array.from({ length: 15 }, (_, i) => ({
    id: 'IN' + (2026001 + i), product: pick(['电子产品','日用百货','食品饮料','服装鞋帽','家居用品']),
    quantity: randInt(50, 500), warehouse: pick(['深圳仓','上海仓','北京仓','广州仓']),
    operator: pick(['管理员','李主管','王仓管']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const outbound = Array.from({ length: 15 }, (_, i) => ({
    id: 'OUT' + (2026001 + i), product: pick(['电子产品','日用百货','食品饮料','服装鞋帽','家居用品']),
    quantity: randInt(20, 200), warehouse: pick(['深圳仓','上海仓','北京仓','广州仓']),
    operator: pick(['管理员','李主管','王仓管']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const stocktakes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, product: pick(['电子产品','日用百货','食品饮料','服装鞋帽','家居用品']),
    warehouse: pick(['深圳仓','上海仓','北京仓','广州仓']),
    systemStock: randInt(100, 1000), actualStock: randInt(100, 1000),
    difference: pick(['0','-2','+3','-1','+1','0','0']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    logistics_waybillList: orders,
    logistics_tracking: trackings,
    logistics_vehicleArchive: vehicles,
    logistics_dispatch: dispatches,
    logistics_courier: couriers,
    logistics_route: routes,
    logistics_inbound: inbound,
    logistics_outbound: outbound,
    logistics_stocktake: stocktakes
  }
}

function generateHr() {
  const depts = ['技术部','产品部','设计部','市场部','运营部','财务部','人事部','法务部','行政部','客服部']
  const positions = ['工程师','高级工程师','经理','总监','专员','主管','助理','分析师','架构师','设计师']

  const employees = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), department: pick(depts), position: pick(positions),
    phone: randPhone(), joinDate: randDate(new Date('2022-01-01'), new Date('2026-03-31')),
    status: pick(['在职','在职','在职','在职','离职']),
    createdAt: randDate(new Date('2022-01-01'), new Date('2026-04-30'))
  }))

  const onboardOffboards = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: genName(), type: pick(['入职','入职','入职','离职']),
    department: pick(depts), effectiveDate: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    remark: pick(['校招入职','社招入职','个人原因离职','合同到期','转正']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const attendance = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1, name: genName(), department: pick(depts),
    date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    checkIn: `${String(randInt(8, 9)).padStart(2, '0')}:${String(randInt(0, 59)).padStart(2, '0')}`,
    checkOut: `${String(randInt(17, 20)).padStart(2, '0')}:${String(randInt(0, 59)).padStart(2, '0')}`,
    status: pick(['正常','正常','正常','正常','迟到','早退','缺勤','请假']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const leaves = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, applicant: genName(), type: pick(['年假','事假','病假','婚假','产假','调休']),
    days: randInt(1, 5), reason: pick(['回老家','家事','身体不适','旅游','个人原因','家人生病']),
    startDate: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    status: pick(['已批准','已批准','待审批','已拒绝']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const salaries = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), department: pick(depts), position: pick(positions),
    baseSalary: randInt(8000, 35000), bonus: randInt(0, 15000),
    deduction: randInt(0, 3000), actual: randInt(8000, 45000),
    month: pick(['2026-01','2026-02','2026-03','2026-04']),
    status: pick(['已发放','已发放','待发放']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const payRecords = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, batch: 'B' + (202601 + i), month: `2026年${i + 1}月`,
    count: randInt(1200, 1300), totalAmount: `¥${randInt(2000000, 3000000).toLocaleString()}`,
    payDate: randDate(new Date('2026-01-25'), new Date('2026-04-30')),
    status: pick(['已发放','已发放','待发放']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const recruitNeeds = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, position: pick(['前端工程师','后端工程师','产品经理','UI设计师','测试工程师','运维工程师','数据分析师','项目经理']),
    department: pick(depts), count: randInt(1, 5),
    urgency: pick(['紧急','普通','普通']), status: pick(['招聘中','招聘中','已完成','待审批']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const interviews = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, candidate: genName(), position: pick(['前端工程师','后端工程师','产品经理','UI设计师','测试工程师']),
    interviewer: genName(), date: randDate(new Date('2026-01-15'), new Date('2026-05-30')),
    result: pick(['待面试','通过','未通过','待定']),
    status: pick(['待面试','已面试','已面试','已取消']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const trainPlans = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: pick(['Vue3技术培训','产品思维培训','管理能力提升','安全意识培训','新员工培训','销售技巧培训']),
    trainer: genName(), date: randDate(new Date('2026-02-01'), new Date('2026-06-30')),
    participants: randInt(15, 50), status: pick(['未开始','进行中','已完成','已取消']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const trainCourses = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, name: pick(['Vue3入门到精通','产品方法论','项目管理实战','沟通技巧','数据分析基础','领导力培养']),
    type: pick(['技术','管理','通用','专业']), hours: pick([8, 16, 24, 32]),
    trainer: genName(), status: pick(['已上线','已上线','审核中','已下线']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  return {
    hr_employeeArchive: employees,
    hr_onboardOffboard: onboardOffboards,
    hr_punchRecord: attendance,
    hr_leaveApproval: leaves,
    hr_salaryCalc: salaries,
    hr_payRecord: payRecords,
    hr_recruitNeed: recruitNeeds,
    hr_interview: interviews,
    hr_trainPlan: trainPlans,
    hr_trainCourse: trainCourses
  }
}

function generateFinance() {
  const types = ['差旅费','办公用品','招待费','培训费','交通费','通讯费','维修费','其他']

  const income = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1, source: pick(['客户A回款','客户B回款','服务费收入','投资收益','利息收入','政府补贴','合作分成','版权收入']),
    amount: randInt(10000, 500000), date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    category: pick(['主营业务','投资收益','其他收入','政府补助']),
    status: pick(['已到账','已到账','已到账','待到账']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const expenses = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1, purpose: pick(['办公设备采购','员工薪资','市场推广','办公室租金','设备采购','差旅费','税费','水电费']),
    amount: randInt(1000, 200000), date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    category: pick(['固定资产','人力成本','营销费用','运营成本','税费支出']),
    approval: pick(['已审批','已审批','待审批']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const reimbursements = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, applicant: genName(), type: pick(types),
    amount: randInt(100, 20000), description: pick(['北京出差','采购设备','客户接待','技术培训','打车费用','电话费','设备维修','其他费用']),
    status: pick(['待审批','审批中','已审批','已审批','已审批','已拒绝']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const invoices = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, number: `INV${20260001 + i}`, type: pick(['增值税专用发票','增值税普通发票','电子发票']),
    amount: randInt(1000, 100000), status: pick(['已开具','已开具','待开具','已作废']),
    client: pick(['腾讯科技','阿里巴巴','字节跳动','百度在线','京东集团','美团点评','网易公司','小米科技','华为技术','中兴通讯']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const budgets = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, subject: pick(['人力成本','营销费用','研发投入','运营成本','行政费用','设备采购','培训费用','差旅费用']),
    budgetAmount: randInt(500000, 5000000), usedAmount: randInt(100000, 4000000),
    remaining: randInt(100000, 2000000), usageRate: `${randInt(30, 95)}%`,
    status: pick(['执行中','执行中','已完成','超支预警']),
    createdAt: randDate(new Date('2025-12-01'), new Date('2026-04-30'))
  }))

  const receivables = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, client: pick(['A公司','B公司','C公司','D公司','E公司','F公司']),
    amount: randInt(50000, 500000), dueDate: randDate(new Date('2026-02-01'), new Date('2026-06-30')),
    overdueDays: pick([0, 0, 0, randInt(5, 30)]),
    riskLevel: pick(['低','低','中','高']),
    status: pick(['正常','正常','逾期','逾期']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const payables = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, supplier: pick(['供应商X','供应商Y','供应商Z','供应商W','供应商V']),
    amount: randInt(30000, 300000), dueDate: randDate(new Date('2026-02-01'), new Date('2026-06-30')),
    overdueDays: pick([0, 0, 0, randInt(3, 20)]),
    priority: pick(['高','中','低']),
    status: pick(['待支付','待支付','逾期','已支付']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    finance_income: income,
    finance_expense: expenses,
    finance_reimburse: reimbursements,
    finance_invoiceInput: invoices,
    finance_budgetPlan: budgets,
    finance_receivableList: receivables,
    finance_payableList: payables
  }
}

function generateRestaurant() {
  const dishNames = ['宫保鸡丁套餐','红烧肉套餐','清蒸鲈鱼','麻婆豆腐','酸菜鱼','蛋炒饭','水煮牛肉','回锅肉','糖醋排骨','鱼香肉丝','番茄炒蛋','干锅花菜','蒜蓉西兰花','红烧茄子','青椒肉丝','土豆炖牛肉','白切鸡','烤鱼','麻辣香锅','小笼包']
  const categories = ['招牌菜','家常菜','凉菜','汤品','主食','饮品','甜品','套餐']

  const dishes = dishNames.map((name, i) => ({
    id: i + 1, name, price: randInt(18, 128), originalPrice: randInt(25, 168),
    category: pick(categories), sales: randInt(500, 10000),
    status: pick(['在售','在售','在售','售罄']),
    img: pick(['🍗','🥩','🐟','🫘','🐠','🍚','🥘','🍖','🥟','🍲']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const salesRecords = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1, table: `${pick(['A','B','C','D'])}${randInt(1, 10)}`,
    dishes: `${pick(dishNames)}×${randInt(1, 3)}, ${pick(dishNames)}×${randInt(1, 2)}`,
    amount: randInt(30, 500), payMethod: pick(['微信','支付宝','现金','会员卡']),
    status: pick(['已完成','已完成','已完成','待支付','已取消']),
    customer: genName(), createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const cashiers = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, cashier: genName(), shift: pick(['午班','晚班','早班']),
    orderCount: randInt(30, 80), totalAmount: randInt(3000, 10000),
    refundAmount: randInt(0, 200), handoverTime: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    status: pick(['已交班','已交班','在班']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const goodsStocks = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: pick(['鸡胸肉','鲈鱼','豆腐','排骨','牛肉','猪肉','鸡蛋','花菜','西兰花','茄子','青椒','土豆','白菜','番茄','面粉','大米','食用油','酱油','醋','盐']),
    category: pick(['肉类','海鲜','素菜','主食','调料']),
    stock: randInt(5, 200), alertValue: pick([10, 20, 30]),
    unit: pick(['kg','条','块','袋','瓶','箱']),
    status: pick(['正常','正常','正常','预警','缺货']),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const restaurantStocktakes = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, product: pick(['鸡胸肉','鲈鱼','豆腐','排骨','牛肉','鸡蛋','花菜','土豆']),
    systemStock: randInt(20, 200), actualStock: randInt(20, 200),
    difference: pick(['0','0','-1','+2','-3','+1']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const members = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, name: genName(), phone: randPhone(), level: pick(['普通会员','银卡会员','金卡会员','钻石会员']),
    points: randInt(100, 20000), balance: (Math.random() * 5000).toFixed(2),
    visits: randInt(5, 200), status: pick(['正常','正常','正常','冻结']),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const pointsRules = [
    { id: 1, rule: '基础积分', consumeAmount: '¥1', earnPoints: '1分', exchangeRate: '100分=¥1', status: '启用' },
    { id: 2, rule: '双倍积分', consumeAmount: '¥1', earnPoints: '2分', exchangeRate: '100分=¥1', status: '仅周末启用' },
    { id: 3, rule: '生日积分', consumeAmount: '¥1', earnPoints: '3分', exchangeRate: '100分=¥1', status: '生日当天启用' }
  ]

  const staffArchives = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: genName(), position: pick(['收银员','服务员','厨师','领班','店长']),
    joinDate: randDate(new Date('2023-01-01'), new Date('2026-03-31')),
    phone: randPhone(), status: pick(['在职','在职','在职','离职']),
    createdAt: randDate(new Date('2023-01-01'), new Date('2026-04-30'))
  }))

  const staffSchedules = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: genName(),
    mon: pick(['午班','晚班','全天','休息']), tue: pick(['午班','晚班','全天','休息']),
    wed: pick(['午班','晚班','全天','休息']), thu: pick(['午班','晚班','全天','休息']),
    fri: pick(['午班','晚班','全天','休息']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    restaurant_salesRecord: salesRecords,
    restaurant_cashier: cashiers,
    restaurant_goodsStock: goodsStocks,
    restaurant_stocktake: restaurantStocktakes,
    restaurant_memberList: members,
    restaurant_points: pointsRules,
    restaurant_staffArchive: staffArchives,
    restaurant_staffSchedule: staffSchedules,
    restaurant_dishes: dishes
  }
}

function generateCommunity() {
  const buildings = Array.from({ length: 10 }, (_, i) => `${i + 1}栋`)

  const residents = Array.from({ length: 40 }, (_, i) => ({
    id: i + 1, name: genName(), building: pick(buildings), room: `${randInt(1, 6)}0${randInt(1, 5)}`,
    phone: randPhone(), type: pick(['业主','业主','业主','租户']),
    familySize: randInt(1, 6), moveInDate: randDate(new Date('2020-01-01'), new Date('2026-03-31')),
    status: pick(['正常','正常','正常','欠费']),
    createdAt: randDate(new Date('2020-01-01'), new Date('2026-04-30'))
  }))

  const households = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, owner: genName(), familyMembers: randInt(1, 6),
    area: pick(['89㎡','120㎡','150㎡','60㎡','200㎡']),
    propertyFee: pick(['¥267/月','¥360/月','¥450/月','¥180/月','¥600/月']),
    building: pick(buildings), status: pick(['正常','正常','正常','欠费']),
    createdAt: randDate(new Date('2020-01-01'), new Date('2026-04-30'))
  }))

  const repairTypes = ['水电','门窗','电梯','管道','墙面','空调','消防','其他']
  const repairs = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1, resident: genName(), building: pick(buildings),
    type: pick(repairTypes), description: pick(['水龙头漏水','窗户关不严','电梯异响','下水道堵塞','墙面开裂','空调不制冷','消防通道堵塞','门锁损坏','楼道灯不亮','停车位问题']),
    urgency: pick(['普通','普通','紧急']),
    status: pick(['待处理','处理中','已处理','已处理','已处理']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const repairProgresses = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, repairId: i + 1, description: pick(['水龙头漏水','电梯异响','下水道堵塞','空调不制冷']),
    assignee: pick(['维修工小李','维修工小王','电梯维保公司','专业维修队']),
    startTime: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    estimatedEnd: randDate(new Date('2026-04-01'), new Date('2026-05-30')),
    progress: pick(['20%','40%','60%','80%','100%']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const announcements = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, title: `${pick(['关于','关于','关于'])}${pick(['春节放假','物业费缴纳','小区绿化','停车位管理','垃圾分类','消防安全','社区活动','电梯维护','水管检修','业主大会'])}的${pick(['通知','公告','提醒'])}`,
    type: pick(['公告','通知','活动','提醒']), views: randInt(200, 5000),
    status: pick(['已发布','已发布','已下架']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const complaints = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, resident: genName(), content: pick(['楼道灯不亮','邻居噪音扰民','停车位被占','物业响应慢','绿化不足','垃圾分类不当','电梯故障','公共区域脏乱']),
    category: pick(['设施','邻里','物业','环境','安全']),
    status: pick(['待处理','处理中','已处理','已处理']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const facilities = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1, name: pick(['健身房','游泳池','儿童乐园','篮球场','图书馆','棋牌室','乒乓球室','瑜伽室','老年活动中心','地下车库']),
    location: pick(['A栋1层','B栋顶层','C区','D栋2层','中心广场']),
    status: pick(['正常','正常','正常','维护中']),
    lastMaintenance: randDate(new Date('2026-01-01'), new Date('2026-03-31')),
    nextMaintenance: randDate(new Date('2026-04-01'), new Date('2026-06-30')),
    createdAt: randDate(new Date('2025-01-01'), new Date('2026-04-30'))
  }))

  const maintenances = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, facility: pick(['健身房','游泳池','儿童乐园','篮球场','图书馆','电梯','消防设施']),
    content: pick(['跑步机维修','水质处理','设施更换','地面修复','空调保养','电梯年检','消防检测']),
    maintainer: pick(['张师傅','专业公司','李师傅','维保公司']),
    cost: randInt(200, 5000), status: pick(['已完成','已完成','进行中','待处理']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    community_residentInfo: residents,
    community_household: households,
    community_repairList: repairs,
    community_repairProgress: repairProgresses,
    community_announcement: announcements,
    community_complaintList: complaints,
    community_publicFacility: facilities,
    community_maintenance: maintenances
  }
}

function generateProject() {
  const projectNames = ['电商平台重构','教育系统开发','内部OA升级','数据中台建设','移动端App开发','支付系统改造','用户增长平台','智能客服系统','供应链管理','风控引擎优化','内容推荐系统','直播平台搭建','物联网平台','数字孪生项目','AI助手开发']
  const priorities = ['高','中','低']

  const projects = projectNames.map((name, i) => ({
    id: i + 1, name, manager: genName(), progress: randInt(0, 100),
    priority: pick(priorities), members: randInt(3, 12),
    status: pick(['进行中','进行中','进行中','已完成','已完成','待启动']),
    deadline: randDate(new Date('2026-03-01'), new Date('2026-12-31')),
    createdAt: randDate(new Date('2025-06-01'), new Date('2026-04-30'))
  }))

  const tasks = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1, name: pick(['前端页面开发','API接口联调','数据库设计','UI设计评审','测试用例编写','性能优化','安全审计','文档编写','代码审查','部署上线','需求分析','架构设计','原型设计','接口测试','集成测试','Bug修复','版本发布','监控告警','日志分析','数据迁移']) + pick(['','(优先)','(紧急)','-阶段1','-阶段2','-阶段3']),
    project: pick(projectNames), assignee: genName(),
    deadline: randDate(new Date('2026-02-01'), new Date('2026-12-31')),
    priority: pick(priorities), status: pick(['待开始','进行中','进行中','已完成','已完成','已完成']),
    createdAt: randDate(new Date('2025-10-01'), new Date('2026-04-30'))
  }))

  const teamMembers = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1, name: genName(), role: pick(['前端工程师','后端工程师','UI设计师','产品经理','测试工程师','运维工程师','项目经理','数据分析师']),
    department: pick(['技术部','产品部','设计部','测试部','运维部']),
    projects: randInt(1, 5), tasks: randInt(3, 20),
    status: pick(['在线','在线','忙碌','离线']),
    createdAt: randDate(new Date('2024-01-01'), new Date('2026-04-30'))
  }))

  const roleAssigns = [
    { id: 1, role: '项目经理', count: 5, permission: '全部权限', projectCount: 8, status: '启用' },
    { id: 2, role: '开发工程师', count: 20, permission: '代码权限', projectCount: 12, status: '启用' },
    { id: 3, role: '测试工程师', count: 8, permission: '测试权限', projectCount: 10, status: '启用' },
    { id: 4, role: '设计师', count: 6, permission: '设计权限', projectCount: 8, status: '启用' }
  ]

  const projectDocs = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, title: pick(['需求规格说明书','技术架构设计','测试计划','接口文档','部署手册','用户手册','项目计划','风险评估报告']),
    project: pick(projectNames), author: genName(),
    updatedAt: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    version: `v${randInt(1, 3)}.${randInt(0, 9)}`,
    createdAt: randDate(new Date('2025-10-01'), new Date('2026-04-30'))
  }))

  const versions = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, version: `v${randInt(1, 3)}.${randInt(0, 9)}.${randInt(0, 9)}`,
    project: pick(projectNames), committer: genName(),
    date: randDate(new Date('2026-01-01'), new Date('2026-04-30')),
    changeLog: pick(['新增商品模块','修复订单Bug','优化性能','更新UI','新增导出功能','修复安全漏洞','重构架构']),
    status: pick(['已发布','已发布','开发中','已回滚']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  const risks = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, description: pick(['前端进度延迟','接口性能问题','需求变更频繁','人员流失风险','技术选型风险','第三方依赖风险','安全漏洞风险','预算超支风险']),
    project: pick(projectNames), level: pick(['高','中','低']),
    possibility: pick(['高','中','低']), status: pick(['监控中','已缓解','已发生','已关闭']),
    createdAt: randDate(new Date('2025-10-01'), new Date('2026-04-30'))
  }))

  const riskResponses = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1, riskId: randInt(1, 15),
    measure: pick(['增加人力投入','性能压测优化','需求冻结机制','人员备份方案','技术预研','替代方案准备','安全审计','预算控制']),
    assignee: genName(), deadline: randDate(new Date('2026-02-01'), new Date('2026-06-30')),
    status: pick(['执行中','待执行','已完成','已取消']),
    createdAt: randDate(new Date('2026-01-01'), new Date('2026-04-30'))
  }))

  return {
    project_taskBoard: tasks,
    project_teamMember: teamMembers,
    project_roleAssign: roleAssigns,
    project_taskList: tasks.slice(0, 30),
    project_projectDoc: projectDocs,
    project_version: versions,
    project_riskIdentify: risks,
    project_riskResponse: riskResponses,
    project_projects: projects
  }
}

function generatePortalData() {
  const portalProducts = [
    { id: 1, name: 'iPhone 15 Pro', price: '¥8,999', originalPrice: '¥9,999', img: '📱', sales: '2.3万', tag: '爆款', industry: 'ecommerce' },
    { id: 2, name: 'MacBook Air M3', price: '¥9,499', originalPrice: '¥10,999', img: '💻', sales: '1.5万', tag: '新品', industry: 'ecommerce' },
    { id: 3, name: 'AirPods Pro 2', price: '¥1,899', originalPrice: '¥2,199', img: '🎧', sales: '3.8万', tag: '热销', industry: 'ecommerce' },
    { id: 4, name: 'Vue3全栈开发实战', price: '¥199', originalPrice: '¥399', img: '📘', sales: '1.2万', tag: '爆款', industry: 'education' },
    { id: 5, name: 'AI大模型应用开发', price: '¥249', originalPrice: '¥499', img: '🤖', sales: '2.1万', tag: '热门', industry: 'education' },
    { id: 6, name: 'Python数据分析', price: '¥149', originalPrice: '¥299', img: '📊', sales: '8,500', tag: '推荐', industry: 'education' },
    { id: 7, name: '营业执照申请', price: '免费', originalPrice: '', img: '📋', sales: '5.6万', tag: '热门', industry: 'government' },
    { id: 8, name: '社保转移接续', price: '免费', originalPrice: '', img: '🛡️', sales: '3.2万', tag: '常用', industry: 'government' },
    { id: 9, name: '王主任 · 心内科', price: '¥50起', originalPrice: '', img: '👨‍⚕️', sales: '3.2万', tag: '推荐', industry: 'medical' },
    { id: 10, name: '李医生 · 骨科', price: '¥40起', originalPrice: '', img: '👩‍⚕️', sales: '2.8万', tag: '好评', industry: 'medical' },
    { id: 11, name: '标准快递', price: '¥12起', originalPrice: '', img: '📦', sales: '10万+', tag: '常用', industry: 'logistics' },
    { id: 12, name: '特快专递', price: '¥25起', originalPrice: '', img: '🚀', sales: '5万+', tag: '极速', industry: 'logistics' },
    { id: 13, name: '前端工程师', price: '面议', originalPrice: '', img: '💼', sales: '50+职位', tag: '急招', industry: 'hr' },
    { id: 14, name: '产品经理', price: '面议', originalPrice: '', img: '🎯', sales: '30+职位', tag: '热门', industry: 'hr' },
    { id: 15, name: '企业贷款', price: '年化4.5%起', originalPrice: '', img: '🏦', sales: '1.2万', tag: '推荐', industry: 'finance' },
    { id: 16, name: '宫保鸡丁套餐', price: '¥38', originalPrice: '¥48', img: '🍗', sales: '5,600', tag: '招牌', industry: 'restaurant' },
    { id: 17, name: '清蒸鲈鱼', price: '¥68', originalPrice: '¥88', img: '🐟', sales: '3,200', tag: '必点', industry: 'restaurant' },
    { id: 18, name: '物业报修', price: '免费', originalPrice: '', img: '🔧', sales: '1,200', tag: '常用', industry: 'community' },
    { id: 19, name: '社区活动报名', price: '免费', originalPrice: '', img: '🎉', sales: '800', tag: '热门', industry: 'community' },
    { id: 20, name: '电商平台重构', price: '咨询报价', originalPrice: '', img: '🚀', sales: '进行中', tag: '重点项目', industry: 'project' }
  ]
  return { portal_products: portalProducts }
}

export function generateAllSeedData() {
  return {
    ...generateEcommerce(),
    ...generateEducation(),
    ...generateGovernment(),
    ...generateMedical(),
    ...generateLogistics(),
    ...generateHr(),
    ...generateFinance(),
    ...generateRestaurant(),
    ...generateCommunity(),
    ...generateProject(),
    ...generatePortalData()
  }
}
