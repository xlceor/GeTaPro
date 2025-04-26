import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Tipado nuevo para representar el contenido complejo
type RichTextContent = {
  type: string;
  content?: RichTextContent[];
  attrs?: Record<string, JSON>;
  marks?: { type: string }[];
  text?: string;
};

type Section = {
  name: string;
  text: RichTextContent;
  extraFiles: string[]; // Aquí se pueden agregar archivos específicos por sección
};

type Project = {
  id: string;
  name: string;
  description: string;
  files: string[];
  created_at: string;
  progress: number;
  chapter1: Record<string, Section>;
  chapter2: Record<string, Section>;
  chapter3: Record<string, Section>;
  chapter4: Record<string, Section>;
};

function createEmptySection(name: string): Section {
  return {
    name,
    text: {
      type: 'doc',
      content: []  // JSON vacío al principio
    },
    extraFiles: [] // Sin archivos al principio
  };
}

export async function createUser(id: string, name: string, photoUrl: string) {
  const { data, error } = await supabase.from('users').insert({
    id,
    name,
    photoUrl,
    projects: []
  });

  if (error) {
    throw new Error(`Error creando usuario ${id}: ${error.message}`);
  }

  return data;
}

export async function createProject(
  userId: string,
  name: string,
  description: string
) {
  const id = uuidv4();
  const created_at = new Date().toISOString();
  console.log("userId" + userId)
  console.log("name" + name)
  console.log("description" + description)

  const project: Project = {
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
  await addProjectToUser(userId, project);
  return project;
}

export async function addProjectToUser(userId: string, project: Project) {
  console.log("userId", userId);

  // Asegúrate de que userId sea un UUID
  const { data, error } = await supabase.rpc('append_project', {
    uid: userId,  // userId ya debería ser un UUID si lo estás pasando como texto.
    new_project: project
  });

  console.log("data", data);  // Verifica la respuesta de la base de datos

  if (error) {
    throw new Error(`Error agregando proyecto al usuario ${userId}: ${error.message}`);
  }

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