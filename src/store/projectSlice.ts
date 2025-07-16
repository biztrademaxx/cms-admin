import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectState {
  projectId: string | null;
  projectName: string | null;
}

const initialState: ProjectState = {
  projectId: null,
  projectName: null,
};

interface ProjectPayload {
  projectId: string;
  projectName: string;
}

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectPayload>) => {
      state.projectId = action.payload.projectId;
      state.projectName = action.payload.projectName;
    },
    resetProject: (state) => {
      state.projectId = null;
      state.projectName = null;
    },
  },
});

export const { setProject, resetProject } = projectSlice.actions;
export default projectSlice.reducer;
