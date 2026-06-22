import { createHashRouter } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import DashboardPage from '../pages/DashboardPage'
import CompanyManagementPage from '../pages/CompanyManagementPage'
import UserRoleManagementPage from '../pages/UserRoleManagementPage'
import SubscriptionManagementPage from '../pages/SubscriptionManagementPage'
import ModuleMarketplacePage from '../pages/ModuleMarketplacePage'
import BillingInvoicingPage from '../pages/BillingInvoicingPage'
import CarbonFootprintPage from '../pages/CarbonFootprintPage'
import ESGManagementPage from '../pages/ESGManagementPage'
import CSRDCompliancePage from '../pages/CSRDCompliancePage'
import CBAMCompliancePage from '../pages/CBAMCompliancePage'
import Scope1ManagementPage from '../pages/Scope1ManagementPage'
import Scope2ManagementPage from '../pages/Scope2ManagementPage'
import Scope3ManagementPage from '../pages/Scope3ManagementPage'
import SupplierPortalPage from '../pages/SupplierPortalPage'
import EnergyMonitoringPage from '../pages/EnergyMonitoringPage'
import WaterMonitoringPage from '../pages/WaterMonitoringPage'
import WasteMonitoringPage from '../pages/WasteMonitoringPage'
import IoTDeviceManagementPage from '../pages/IoTDeviceManagementPage'
import AISustainabilityAssistantPage from '../pages/AISustainabilityAssistantPage'
import DigitalTwinPage from '../pages/DigitalTwinPage'
import AuditManagementPage from '../pages/AuditManagementPage'
import LCAManagementPage from '../pages/LCAManagementPage'
import SustainabilityProjectsPage from '../pages/SustainabilityProjectsPage'
import ReportingCenterPage from '../pages/ReportingCenterPage'
import DocumentManagementPage from '../pages/DocumentManagementPage'
import NotificationCenterPage from '../pages/NotificationCenterPage'
import WorkflowEnginePage from '../pages/WorkflowEnginePage'
import APIManagementPage from '../pages/APIManagementPage'
import IntegrationCenterPage from '../pages/IntegrationCenterPage'
import DataLakePage from '../pages/DataLakePage'
import MasterDataManagementPage from '../pages/MasterDataManagementPage'

export const router = createHashRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'company-management', element: <CompanyManagementPage /> },
      { path: 'user-role-management', element: <UserRoleManagementPage /> },
      { path: 'subscription-management', element: <SubscriptionManagementPage /> },
      { path: 'module-marketplace', element: <ModuleMarketplacePage /> },
      { path: 'billing-invoicing', element: <BillingInvoicingPage /> },
      { path: 'carbon-footprint', element: <CarbonFootprintPage /> },
      { path: 'esg-management', element: <ESGManagementPage /> },
      { path: 'csrd-compliance', element: <CSRDCompliancePage /> },
      { path: 'cbam-compliance', element: <CBAMCompliancePage /> },
      { path: 'scope-1-management', element: <Scope1ManagementPage /> },
      { path: 'scope-2-management', element: <Scope2ManagementPage /> },
      { path: 'scope-3-management', element: <Scope3ManagementPage /> },
      { path: 'supplier-portal', element: <SupplierPortalPage /> },
      { path: 'energy-monitoring', element: <EnergyMonitoringPage /> },
      { path: 'water-monitoring', element: <WaterMonitoringPage /> },
      { path: 'waste-monitoring', element: <WasteMonitoringPage /> },
      { path: 'iot-device-management', element: <IoTDeviceManagementPage /> },
      { path: 'ai-sustainability-assistant', element: <AISustainabilityAssistantPage /> },
      { path: 'digital-twin', element: <DigitalTwinPage /> },
      { path: 'audit-management', element: <AuditManagementPage /> },
      { path: 'lca-management', element: <LCAManagementPage /> },
      { path: 'sustainability-projects', element: <SustainabilityProjectsPage /> },
      { path: 'reporting-center', element: <ReportingCenterPage /> },
      { path: 'document-management', element: <DocumentManagementPage /> },
      { path: 'notification-center', element: <NotificationCenterPage /> },
      { path: 'workflow-engine', element: <WorkflowEnginePage /> },
      { path: 'api-management', element: <APIManagementPage /> },
      { path: 'integration-center', element: <IntegrationCenterPage /> },
      { path: 'data-lake', element: <DataLakePage /> },
      { path: 'master-data-management', element: <MasterDataManagementPage /> }
    ]
  }
])
