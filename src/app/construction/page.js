import ServiceDetail, { serviceMetadata } from '@/components/ServiceDetail';
import { serviceBySlug } from '@/data/catalog';

const service = serviceBySlug['home-construction'];

export const metadata = serviceMetadata(service);

export default function ConstructionPage() {
  return <ServiceDetail service={service} />;
}
