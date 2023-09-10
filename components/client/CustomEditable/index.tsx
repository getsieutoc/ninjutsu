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
} from '@/components/chakra';
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

export type CustomEditableProps = EditableProps;

export const CustomEditable = (props: CustomEditableProps) => {
  return (
    <Editable
      gap={2}
      as={Flex}
      align="center"
      isPreviewFocusable={false}
      width="100%"
      {...props}
    >
      <EditablePreview />
      <Input as={EditableInput} size="sm" />
      {props.value && <EditableControls />}
    </Editable>
  );
};
