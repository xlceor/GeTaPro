// app/lib/db.ts
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createUser(id: string, name: string, photoUrl: string) {
  const { data, error } = await supabase.from('users').insert({
    id,
    name,
    photoUrl,
    projects: []  // empieza vacío
  });

  if (error) {
    throw new Error(`Error creando usuario ${id}: ${error.message}`);
  }

  return data;
}

type Section = { name: string; text: string };
type Project = {
  id: string;
  name: string;
  description: string;
  files: string[];
  created_at: string;
  chapter1: Record<string, Section>;
  chapter2: Record<string, Section>;
  chapter3: Record<string, Section>;
  chapter4: Record<string, Section>;
};

function createEmptySection(name: string): Section {
  return { name, text: '' };
}

export async function createProject(
  userId: string,
  name: string,
  description: string
) {
  const id = uuidv4();
  const created_at = new Date().toISOString();

  const project: Project = {
    id,
    name,
    description,
    files: [],  // Inicialmente vacío
    created_at,
    chapter1: {
      problem_statement: createEmptySection('Problem Statement'),
      research_objectives: createEmptySection('Research Objectives'),
      research_justification: createEmptySection('Research Justification'),
      hypothesis: createEmptySection('Hypothesis')
    },
    chapter2: {
      research_background: createEmptySection('Research Background'),
      international_background: createEmptySection('International Background'),
      national_background: createEmptySection('National Background'),
      state_background: createEmptySection('State Background')
    },
    chapter3: {
      research_paradigm: createEmptySection('Research Paradigm'),
      research_method: createEmptySection('Research Method'),
      research_type: createEmptySection('Research Type'),
      research_approach: createEmptySection('Research Approach'),
      population_sample: createEmptySection('Population and Sample'),
      scenarios_informants: createEmptySection('Scenarios and Informants'),
      data_collection: createEmptySection('Data Collection')
    },
    chapter4: {
      conclusion: createEmptySection('Conclusion'),
      recommendations: createEmptySection('Recommendations'),
      bibliography: createEmptySection('Bibliography')
    }
  };

  // Guardar el proyecto en la base de datos
  const { data, error } = await supabase.rpc('append_project', {
    uid: userId,
    new_project: project
  });

  if (error) {
    throw new Error(`Error creando el proyecto para el usuario ${userId}: ${error.message}`);
  }

  return data;
}

export async function addProjectToUser(userId: string, project: Project) {
  const { data, error } = await supabase.rpc('append_project', {
    uid: userId,
    new_project: project
  });

  if (error) {
    throw new Error(`Error agregando proyecto al usuario ${userId}: ${error.message}`);
  }

  return data;
}