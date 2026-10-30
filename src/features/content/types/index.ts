export type UniversityCity = "tashkent" | "bukhara" | "samarkand" | "khorezm"

/** A partner university card; `logo` is a file in `public/img/universities/`, absent when we have none yet. */
export interface PartnerUniversity {
  name: string
  city: UniversityCity
  url: string
  logo?: string
  /** The logo is white, so it sits on navy. */
  dark?: boolean
}
