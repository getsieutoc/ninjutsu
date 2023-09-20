import {
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  IconButton,
  Input,
  useEditableControls,
  type EditableProps,
  InputProps,
} from '@/components/chakra';
import { useId } from '@/hooks';
import { CheckIcon, SmallCloseIcon, EditIcon } from '@/icons';

// Will bring outside if reuse again
function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm">
      <IconButton
        size="xs"
        aria-label="Save"
        icon={<CheckIcon />}
        colorScheme="green"
        {...getSubmitButtonProps()}
      />
      <IconButton
        size="xs"
        aria-label="Cancel"
        icon={<SmallCloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <IconButton
      aria-label="Save"
      size="xs"
      icon={<EditIcon />}
      {...getEditButtonProps()}
    />
  );
}

export type CustomEditableProps = EditableProps &
  Pick<InputProps, 'name' | 'value'>;

export const CustomEditable = ({
  id,
  name,
  value,
  ...rest
}: CustomEditableProps) => {
  const randomId = useId();

  return (
    <Editable
      gap={2}
      as={Flex}
      align="center"
      isPreviewFocusable={false}
      height="32px"
      width="100%"
      value={value}
      {...rest}
    >
      <EditablePreview fontSize="sm" />
      <Input id={id ?? randomId} as={EditableInput} size="sm" name={name} />
      {value && <EditableControls />}
    </Editable>
  );
};
