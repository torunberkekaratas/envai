import {
  FiActivity, FiArchive, FiBell, FiBox, FiBriefcase, FiCloud, FiCpu, FiDatabase,
  FiDroplet, FiFileText, FiGitBranch, FiGlobe, FiGrid, FiLayers, FiLock, FiMap,
  FiPieChart, FiRepeat, FiShield, FiShoppingBag, FiSliders, FiTool, FiTrendingUp,
  FiUsers, FiZap
} from 'react-icons/fi'
import { TbLeaf, TbRecycle, TbRobot, TbStack3 } from 'react-icons/tb'
import { RiBillLine } from 'react-icons/ri'

export const kpiTrend = [
  { month: 'Oca', carbon: 1280, energy: 920, esg: 64 },
  { month: 'Şub', carbon: 1190, energy: 980, esg: 67 },
  { month: 'Mar', carbon: 1148, energy: 940, esg: 69 },
  { month: 'Nis', carbon: 1088, energy: 900, esg: 72 },
  { month: 'May', carbon: 1015, energy: 870, esg: 74 },
  { month: 'Haz', carbon: 965, energy: 830, esg: 78 }
]

export const mixData = [
  { name: 'Kapsam 1', value: 28, color: '#16A34A' },
  { name: 'Kapsam 2', value: 34, color: '#3B82F6' },
  { name: 'Kapsam 3', value: 38, color: '#F59E0B' }
]

export const sites = ['Türkiye', 'Almanya', 'Hollanda', 'İtalya', 'Fransa']

export const dashboardWidgetPool = [
  { id: 'su-ayak-izi', title: 'Su Ayak İzi (m³)', value: '8.420', delta: '-2,1%', icon: FiDroplet, color: '#0ea5e9', goodDirection: 'down' },
  { id: 'atik-geri-donusum', title: 'Atık Geri Dönüşüm Oranı', value: '64%', delta: '+5,4%', icon: TbRecycle, color: '#65a30d', goodDirection: 'up' },
  { id: 'tedarikci-esg', title: 'Tedarikçi ESG Skoru', value: '81 / 100', delta: '+2,8%', icon: FiUsers, color: '#7c3aed', goodDirection: 'up' },
  { id: 'denetim-bulgulari', title: 'Açık Denetim Bulguları', value: '6', delta: '-12,5%', icon: FiTool, color: '#f97316', goodDirection: 'down' }
]

export const modules = [
  { title: 'Dashboard', path: '/', file: 'DashboardPage.jsx', icon: FiGrid, group: 'Command Center', accent: '#16A34A' },
  { title: 'Company Management', path: '/company-management', file: 'CompanyManagementPage.jsx', icon: FiBriefcase, group: 'Admin', accent: '#0EA5E9' },
  { title: 'User & Role Management', path: '/user-role-management', file: 'UserRoleManagementPage.jsx', icon: FiUsers, group: 'Admin', accent: '#6366F1' },
  { title: 'Subscription Management', path: '/subscription-management', file: 'SubscriptionManagementPage.jsx', icon: FiRepeat, group: 'Admin', accent: '#A855F7' },
  { title: 'Module Marketplace', path: '/module-marketplace', file: 'ModuleMarketplacePage.jsx', icon: FiShoppingBag, group: 'Admin', accent: '#F97316' },
  { title: 'Billing & Invoicing', path: '/billing-invoicing', file: 'BillingInvoicingPage.jsx', icon: RiBillLine, group: 'Admin', accent: '#14B8A6' },
  { title: 'Carbon Footprint', path: '/carbon-footprint', file: 'CarbonFootprintPage.jsx', icon: TbLeaf, group: 'Carbon', accent: '#16A34A' },
  { title: 'ESG Management', path: '/esg-management', file: 'ESGManagementPage.jsx', icon: FiShield, group: 'Compliance', accent: '#22C55E' },
  { title: 'CSRD Compliance', path: '/csrd-compliance', file: 'CSRDCompliancePage.jsx', icon: FiFileText, group: 'Compliance', accent: '#06B6D4' },
  { title: 'CBAM Compliance', path: '/cbam-compliance', file: 'CBAMCompliancePage.jsx', icon: FiGlobe, group: 'Compliance', accent: '#10B981' },
  { title: 'Scope 1 Management', path: '/scope-1-management', file: 'Scope1ManagementPage.jsx', icon: FiActivity, group: 'Carbon', accent: '#EF4444' },
  { title: 'Scope 2 Management', path: '/scope-2-management', file: 'Scope2ManagementPage.jsx', icon: FiZap, group: 'Carbon', accent: '#3B82F6' },
  { title: 'Scope 3 Management', path: '/scope-3-management', file: 'Scope3ManagementPage.jsx', icon: FiLayers, group: 'Carbon', accent: '#F59E0B' },
  { title: 'Supplier Portal', path: '/supplier-portal', file: 'SupplierPortalPage.jsx', icon: FiUsers, group: 'Value Chain', accent: '#84CC16' },
  { title: 'Energy Monitoring', path: '/energy-monitoring', file: 'EnergyMonitoringPage.jsx', icon: FiZap, group: 'Operations', accent: '#FACC15' },
  { title: 'Water Monitoring', path: '/water-monitoring', file: 'WaterMonitoringPage.jsx', icon: FiDroplet, group: 'Operations', accent: '#38BDF8' },
  { title: 'Waste Monitoring', path: '/waste-monitoring', file: 'WasteMonitoringPage.jsx', icon: TbRecycle, group: 'Operations', accent: '#22C55E' },
  { title: 'IoT Device Management', path: '/iot-device-management', file: 'IoTDeviceManagementPage.jsx', icon: FiCpu, group: 'Operations', accent: '#06B6D4' },
  { title: 'AI Sustainability Assistant', path: '/ai-sustainability-assistant', file: 'AISustainabilityAssistantPage.jsx', icon: TbRobot, group: 'Intelligence', accent: '#8B5CF6' },
  { title: 'Digital Twin', path: '/digital-twin', file: 'DigitalTwinPage.jsx', icon: FiMap, group: 'Intelligence', accent: '#0F766E' },
  { title: 'Audit Management', path: '/audit-management', file: 'AuditManagementPage.jsx', icon: FiTool, group: 'Governance', accent: '#F97316' },
  { title: 'LCA Management', path: '/lca-management', file: 'LCAManagementPage.jsx', icon: TbStack3, group: 'Product', accent: '#65A30D' },
  { title: 'Sustainability Projects', path: '/sustainability-projects', file: 'SustainabilityProjectsPage.jsx', icon: FiTrendingUp, group: 'Execution', accent: '#16A34A' },
  { title: 'Reporting Center', path: '/reporting-center', file: 'ReportingCenterPage.jsx', icon: FiPieChart, group: 'Reporting', accent: '#2563EB' },
  { title: 'Document Management', path: '/document-management', file: 'DocumentManagementPage.jsx', icon: FiArchive, group: 'Reporting', accent: '#64748B' },
  { title: 'Notification Center', path: '/notification-center', file: 'NotificationCenterPage.jsx', icon: FiBell, group: 'Execution', accent: '#F43F5E' },
  { title: 'Workflow Engine', path: '/workflow-engine', file: 'WorkflowEnginePage.jsx', icon: FiGitBranch, group: 'Execution', accent: '#A855F7' },
  { title: 'API Management', path: '/api-management', file: 'APIManagementPage.jsx', icon: FiLock, group: 'Data Platform', accent: '#0891B2' },
  { title: 'Integration Center', path: '/integration-center', file: 'IntegrationCenterPage.jsx', icon: FiCloud, group: 'Data Platform', accent: '#0EA5E9' },
  { title: 'Data Lake', path: '/data-lake', file: 'DataLakePage.jsx', icon: FiDatabase, group: 'Data Platform', accent: '#14B8A6' },
  { title: 'Master Data Management', path: '/master-data-management', file: 'MasterDataManagementPage.jsx', icon: FiSliders, group: 'Data Platform', accent: '#475569' }
]

const moduleLabels = {
  Dashboard: 'Gösterge Paneli',
  'Company Management': 'Şirket Yönetimi',
  'User & Role Management': 'Kullanıcı ve Rol Yönetimi',
  'Subscription Management': 'Abonelik Yönetimi',
  'Module Marketplace': 'Modül Pazarı',
  'Billing & Invoicing': 'Faturalama ve Tahsilat',
  'Carbon Footprint': 'Karbon Ayak İzi',
  'ESG Management': 'ESG Yönetimi',
  'CSRD Compliance': 'CSRD Uyumu',
  'CBAM Compliance': 'CBAM Uyumu',
  'Scope 1 Management': 'Kapsam 1 Yönetimi',
  'Scope 2 Management': 'Kapsam 2 Yönetimi',
  'Scope 3 Management': 'Kapsam 3 Yönetimi',
  'Supplier Portal': 'Tedarikçi Portalı',
  'Energy Monitoring': 'Enerji İzleme',
  'Water Monitoring': 'Su İzleme',
  'Waste Monitoring': 'Atık İzleme',
  'IoT Device Management': 'IoT Cihaz Yönetimi',
  'AI Sustainability Assistant': 'Yapay Zeka Sürdürülebilirlik Asistanı',
  'Digital Twin': 'Dijital İkiz',
  'Audit Management': 'Denetim Yönetimi',
  'LCA Management': 'Yaşam Döngüsü Analizi Yönetimi',
  'Sustainability Projects': 'Sürdürülebilirlik Projeleri',
  'Reporting Center': 'Raporlama Merkezi',
  'Document Management': 'Doküman Yönetimi',
  'Notification Center': 'Bildirim Merkezi',
  'Workflow Engine': 'İş Akışı Motoru',
  'API Management': 'API Yönetimi',
  'Integration Center': 'Entegrasyon Merkezi',
  'Data Lake': 'Veri Gölü',
  'Master Data Management': 'Ana Veri Yönetimi'
}

const groupLabels = {
  'Command Center': 'Kontrol Merkezi',
  Admin: 'Yönetim',
  Carbon: 'Karbon',
  Compliance: 'Uyum',
  'Value Chain': 'Değer Zinciri',
  Operations: 'Operasyonlar',
  Intelligence: 'Akıllı Araçlar',
  Governance: 'Yönetişim',
  Product: 'Ürün',
  Execution: 'Yürütme',
  Reporting: 'Raporlama',
  'Data Platform': 'Veri Platformu'
}

export function getModuleLabel(title) {
  return moduleLabels[title] || title
}

export function getGroupLabel(group) {
  return groupLabels[group] || group
}

const details = {
  'Carbon Footprint': ['Emisyon KPI kartları', 'Kapsam 1/2/3 dağılımı', 'Karbon trend grafikleri', 'Emisyon kaynakları tablosu', 'Lokasyon filtreleri', 'Karbon yoğunluğu analizleri'],
  'Scope 1 Management': ['Doğrudan emisyon kaynakları', 'Yakıt tüketim kayıtları', 'Filo ve sabit tesis emisyonları', 'Emisyon faktörü kütüphanesi', 'Doğrulama kanıtları'],
  'Scope 2 Management': ['Satın alınan enerji kayıtları', 'Tesis bazlı elektrik tüketimi', 'Pazar bazlı ve konum bazlı hesaplama', 'Yenilenebilir enerji sertifikaları (GO/REC)', 'Tedarikçi emisyon faktörleri'],
  'Scope 3 Management': ['15 kategori bazlı veri toplama', 'Tedarik zinciri emisyon haritası', 'Değer zinciri veri kalite skoru', 'Tedarikçi anket ve veri talepleri', 'Kategori bazlı materiyellik analizi'],
  'ESG Management': ['ESG skorları', 'Hedef takibi', 'Risk panelleri', 'Performans grafikleri', 'Aksiyon planları'],
  'CSRD Compliance': ['Uyum matrisi', 'Gereklilik listesi', 'Eksik veri ekranı', 'Görev takip ekranı', 'Uyum yüzdesi göstergeleri'],
  'CBAM Compliance': ['CBAM ürün ekranı', 'Gömülü emisyon analizleri', 'CBAM raporlama', 'İhracat uyumluluk analizi'],
  'Supplier Portal': ['Tedarikçi listesi', 'Kapsam 3 veri toplama', 'Performans kartları', 'ESG skor ekranları'],
  'Energy Monitoring': ['Enerji dashboardu', 'Tesis görünümü', 'Elektrik sayaçları', 'Tüketim trendleri', 'Maliyet analizleri'],
  'Water Monitoring': ['Su tüketim ekranları', 'Kaçak analizi', 'Tesis bazlı kullanım', 'Trend analizleri'],
  'Waste Monitoring': ['Atık yönetimi', 'Geri dönüşüm oranları', 'Atık KPI ekranları', 'Bertaraf kayıtları'],
  'IoT Device Management': ['ENVAI EDGE POWER', 'ENVAI FLOW', 'ENVAI GAS NODE', 'Sensör ekranları', 'Harita görünümü', 'Alarm merkezi'],
  'AI Sustainability Assistant': ['Yapay zeka sohbet ekranı', 'ESG tavsiyeleri', 'Rapor üretimi', 'Veri analizi'],
  'Digital Twin': ['Dijital tesis görünümü', 'Sensör katmanları', 'Canlı veri panelleri', 'Varlık yönetimi'],
  'Audit Management': ['Denetim planları', 'Denetim bulguları', 'Düzeltici faaliyetler', 'Takvim görünümü'],
  'LCA Management': ['Ürün yaşam döngüsü', 'LCA sonuç ekranları', 'Karşılaştırma ekranları'],
  'Sustainability Projects': ['Proje kartları', 'Gantt görünümü', 'KPI takibi', 'Bütçe ekranları'],
  'Reporting Center': ['ESG raporları', 'CSRD raporları', 'CBAM raporları', 'PDF dışa aktarım', 'Excel dışa aktarım'],
  'Document Management': ['Dosya yöneticisi', 'Doküman önizleme', 'Klasör yapısı', 'Versiyon takibi'],
  'Workflow Engine': ['Sürükle bırak iş akışı tasarımı', 'Süreç tasarım ekranı', 'Onay mekanizmaları'],
  'API Management': ['API anahtarı yönetimi', 'Uç nokta listeleri', 'API kullanım ekranları'],
  'Integration Center': ['SAP', 'Logo ERP', 'Netsis', 'Microsoft', 'Oracle', 'REST API'],
  'Data Lake': ['Veri kaynakları', 'ETL ekranları', 'Veri kalite analizleri'],
  'Master Data Management': ['Veri sözlüğü', 'Veri kalite ekranları', 'Ana veri yönetimi']
}

export function getModuleConfig(title) {
  const module = modules.find((item) => item.title === title)
  const workflows = details[title] || ['Operasyon görünümü', 'Yetki ve görev yönetimi', 'Kurumsal kayıtlar', 'Performans takibi']
  const displayTitle = getModuleLabel(title)
  const displayGroup = getGroupLabel(module?.group)
  return {
    ...module,
    title: displayTitle,
    sourceTitle: title,
    group: displayGroup,
    sourceGroup: module?.group,
    description: `${displayTitle} modülü ENVAI kurumsal sürdürülebilirlik platformunda uçtan uca iş süreci, kontrol, analiz ve karar destek deneyimi sunar.`,
    workflows,
    kpis: workflows.slice(0, 4).map((item, index) => ({
      label: item,
      value: index === 0 ? `${72 + index * 6}%` : index === 1 ? `${120 + index * 35}` : index === 2 ? `${8 + index}` : `${2 + index}`,
      delta: index % 2 === 0 ? '+4.8%' : '-1.2%',
      positive: index !== 1
    })),
    table: workflows.concat(['Onay bekliyor', 'Veri doğrulama']).slice(0, 6).map((item, index) => ({
      id: `ENV-${String(index + 1).padStart(3, '0')}`,
      name: item,
      owner: ['Sürdürülebilirlik', 'Finans', 'Operasyon', 'Tedarik', 'Veri Ekibi'][index % 5],
      status: ['Aktif', 'İncelemede', 'Riskli', 'Tamamlandı'][index % 4],
      date: `2026-0${(index % 6) + 1}-15`
    }))
  }
}

export const currentUser = {
  id: 'ahmet-yilmaz',
  name: 'Ahmet Yılmaz',
  role: 'Sistem Yöneticisi',
  initials: 'A'
}

export const emissionSummary = {
  totalEmission: '12.450,75 tCO₂e',
  totalDelta: '-8,2%',
  scopes: [
    { name: 'Kapsam 1', value: '2.345,60 tCO₂e', share: 18.8, delta: '-5,1%' },
    { name: 'Kapsam 2', value: '3.210,30 tCO₂e', share: 25.8, delta: '-6,3%' },
    { name: 'Kapsam 3', value: '6.894,85 tCO₂e', share: 55.4, delta: '-10,4%' }
  ],
  topSources: [
    ['Satın Alınan Mal & Hizmetler', 4250.3],
    ['Elektrik Tüketimi', 2310.5],
    ['Ulaşım & Dağıtım', 1540.2]
  ],
  esgScore: '78 / 100',
  complianceScore: '92%'
}

export const activities = [
  'CBAM ürün verisi doğrulandı',
  'Kapsam 2 elektrik faturası işlendi',
  'Tedarikçi ESG skoru güncellendi',
  'CSRD ESRS E1 görevi tamamlandı',
  'Enerji anomalisi operasyon ekibine atandı'
]
