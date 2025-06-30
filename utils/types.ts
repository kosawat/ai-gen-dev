export interface TemplateProps {
  name: string;
  desc: string;
  category: string;
  icon: string;
  aiPrompt: string;
  slug: string;
  form: Form[];
}

export interface Form {
  label: string;
  field: string;
  name: string;
  required: boolean;
}

export interface QueriesResponse {
  queries: [];
  page: number;
  totalPages: number;
}

export interface QueryData {
  _id: string;
  template: Template;
  email: string;
  query: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface Template {
  icon: string;
  name: string;
}

export interface UsageContextType {
  count: number;
  fetchUsageCount: (email: string) => void;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  subscribed: boolean;
}
