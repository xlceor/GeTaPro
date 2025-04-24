

export type LabelType =
  | 'problem_statement'
  | 'research_objectives'
  | 'research_justification'
  | 'hypothesis'
  | 'research_background'
  | 'international_background'
  | 'national_background'
  | 'state_background'
  | 'research_paradigm'
  | 'research_method'
  | 'research_type'
  | 'research_approach'
  | 'population_sample'
  | 'scenarios_informants'
  | 'data_collection'
  | 'conclusion'
  | 'recommendations'
  | 'bibliography';


export type Label = {
    name: LabelType
    text : string
    atachment : File
}
export type Chapter = 'chapter1' | 'chapter2' | 'chapter3' | 'chapter4'

export type Proyect = {
    ID:number


}