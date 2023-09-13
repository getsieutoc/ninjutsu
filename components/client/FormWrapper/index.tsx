import { ComponentProps, ReactHTML } from 'react';

export type FormWrapperProps = ComponentProps<ReactHTML['form']>;

export const FormWrapper = (props: FormWrapperProps) => {
  return <form {...props} />;
};
