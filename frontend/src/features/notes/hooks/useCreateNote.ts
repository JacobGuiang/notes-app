import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createNote } from '../api/createNote';

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createNote,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['notes'] }),
  });
};
