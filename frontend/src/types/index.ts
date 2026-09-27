export type VerificationStatus = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
export type ImpactSeverity = 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';

export type InvestigationStatus = 'PENDING' | 'UNDER_REVIEW' | 'VERIFIED' | 'CLOSED';
export type InvestigationPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface OxygenSagPoint {
  distanceKm: number;
  baselineDoMgL: number;
  impactedDoMgL: number;
  dissolvedOxygenDeficit: number;
  criticalThresholdMgL: number;
}

export interface ImpactAssessment {
  factory_id?: string;
  impact_severity: ImpactSeverity;
  impact_headline: string;
  affected_population: number;
  river_oxygen_loss_pct: number;
  oxygen_depletion_mg_l: number;
  pollution_excess_kg_day: number;
  pollution_excess_pct: number;
  receiving_waterbody: string;
  baseline_do_mg_l: number;
  critical_intakes: string[];
  recommended_action: string;
  action_verb: string;
  ecological_risks: string[];
  oxygen_sag_curve?: OxygenSagPoint[];
}

export interface Factory {
  id: string;
  name: string;
  location: string;
  industry: string;
  consentOrderId?: string;
  contactPerson?: string;
  contactEmail?: string;
  latitude?: number;
  longitude?: number;
  overallSignalScore?: number;
  status?: VerificationStatus;
  lastAnalysisDate?: string;
  lastAnalyzed?: string;
  activeSignalsCount?: number;
  // Impact Engine fields
  impactSeverity?: ImpactSeverity;
  impactHeadline?: string;
  affectedPopulation?: number;
  riverOxygenLossPct?: number;
  pollutionExcessKgDay?: number;
  recommendedAction?: string;
  receivingWaterbody?: string;
}

export interface AnalysisResult {
  id: number;
  factoryId: string;
  isolationForestScore: number;
  biologicalPatternScore: number;
  powerConsumptionScore: number;
  overallSignalScore: number;
  status: VerificationStatus;
  signals: string[];
  explanations: {
    isolation_forest?: string;
    biological_pattern?: string;
    power_correlation?: string;
    [key: string]: string | undefined;
  };
  // Impact Engine fields
  impactSeverity?: ImpactSeverity;
  impactHeadline?: string;
  affectedPopulation?: number;
  riverOxygenLossPct?: number;
  oxygenDepletionMgL?: number;
  pollutionExcessKgDay?: number;
  recommendedAction?: string;
  receivingWaterbody?: string;
  impactAssessmentJson?: string;
  impact_assessment?: ImpactAssessment;
  computedAt: string;
}

export interface Measurement {
  id: number;
  factoryId: string;
  parameterName: string;
  value: number;
  unit: string;
  measurementDate: string;
  measurementTime: string;
}

export interface PowerRecord {
  id: number;
  factoryId: string;
  timestamp: string;
  totalKwh: number;
  source: string;
}

export interface Investigation {
  id: number;
  factoryId: string;
  factoryName?: string;
  priority: InvestigationPriority;
  status: InvestigationStatus;
  reason: string;
  notes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardSummary {
  totalFactories: number;
  recordsAnalyzed: number;
  anomaliesDetected: number;
  requiresVerification: number;
  statusDistribution: {
    low?: number;
    moderate?: number;
    high?: number;
    critical?: number;
    [key: string]: number | undefined;
  };
  // Impact aggregates
  totalAffectedPopulation?: number;
  criticalOxygenLossAlerts?: number;
  totalExcessPollutionKgDay?: number;
  highImpactCount?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string | null;
  timestamp: string;
}

