import { createClient } from '@supabase/supabase-js';
import {Section, Project2, Project} from './types'
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



function createEmptySection(name: string): Section {
  return {
    name,
    text: {
      type: 'doc',
      content: []  // JSON vacío al principio
    }
  };
}

export async function createUser(id: string, name: string, photoUrl: string) {
  const { data, error } = await supabase.from('users').insert({
    id,
    name,
    photoUrl,
  });

  if (error) {
    throw new Error(`Error creando usuario ${id}: ${error.message}`);
  }

  return data;
}

export async function createProject(
  userId: string,
  name: string,
  description: string,
) {
  const created_at = new Date().toISOString();
  console.log("userId" + userId)
  console.log("name" + name)
  console.log("description" + description)

  const project: Project = {
    name,
    description,
    files: [],
    created_at,
    progress: 0,
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
  return project;
}

export async function addProjectToUser(userId: string, name: string, description: string, members: string[], role: string) {
  console.log("userId", userId);

  const id = uuidv4(); // Generar manualmente el UUID
  const created_at = new Date().toISOString();

  const project: Project2 = {
    id,
    name,
    description,
    files: [],
    created_at,
    progress: 0,
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

  const { data, error } = await supabase.from('projects').insert({
    id,
    name: project.name,
    description: project.description,
    files: project.files,
    created_at: project.created_at,
    progress: project.progress,
    advisor: userId,
    members: members,
    role_req: role,
    chapter1: project.chapter1,
    chapter2: project.chapter2,
    chapter3: project.chapter3,
    chapter4: project.chapter4,
  }).select().single();

  if (error) {
    throw new Error(`Error agregando proyecto al usuario ${userId}: ${error.message}`);
  }

  console.log("Proyecto", data);
  return data;
}

export async function removeProjectFromUser(userId: string, projectId: string) {
  const { data, error } = await supabase.rpc('remove_project', {
    uid: userId,
    project_id: projectId
  });

  if (error) {
    throw new Error(`Error eliminando proyecto ${projectId} del usuario ${userId}: ${error.message}`);
  }

  return data;
}