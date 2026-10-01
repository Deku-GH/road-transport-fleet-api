export enum Role {
  ADMIN = "admin",
  CHAUFFEUR = "chauffeur",
}

export enum UserStatus {
  ACTIVE = "active",
  SUSPENDED = "suspended",
}

export enum VehicleStatus {
  AVAILABLE = "available",
  MAINTENANCE = "maintenance",
  ON_TRAGECT = "on_tragect",
}

export enum PneuStatus {
  GOOD = "good",
  WORN = "worn",
  TO_REPLACE = "to_replace",
}

export enum TrajetStatus {
  A_FAIRE = "a_faire",
  EN_COURS = "en_cours",
  TERMINE = "termine",
}

export enum MaintenanceType {
  VIDANGE = "vidange",
  REVISION = "revision",
  PNEU = "pneu",
}

export enum MaintenanceStatus {
  A_FAIRE = "a_faire",
  EN_COURS = "en_cours",
  TERMINEE = "terminee",
}