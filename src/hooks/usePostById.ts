import { Post } from '@prisma/client';
import _ from 'lodash';
import { useSWR } from '@/hooks';

const fetcher = async (url: string) => await fetch(url).then((r) => r.json());

export const usePostById = (id: string) => {
  const { data, error, isLoading } = useSWR<Post>('/api/pages/' + id, fetcher);
  return { data: _.cloneDeep(data), error, isLoading };
};
