import { NewThreadRequest } from "@/app/(threads)/page";
import { Dialog, Text, Flex, TextInput, Button } from "@mantine/core"
import { Form, UseFormReturnType } from "@mantine/form"

type AddThreadDialogProps = {
   form:  UseFormReturnType<{
    title: string;
    body: string;
    category: string;
}, (values: {
    title: string;
    body: string;
    category: string;
}) => {
    title: string,
    body : string,
    category : string 
}>,
 opened : boolean,
 onClose : () => void,
 onSubmit : (req : NewThreadRequest) => void 
}

const AddThreadDialog = ({form, opened, onClose, onSubmit} : AddThreadDialogProps ) => {
    

    return (
      <Dialog
        opened={opened}
        withCloseButton
        onClose={onClose}
        size="lg"
        radius="md"
        position={{ top : 50, left : 400}}
      >
        <Text size="md" fw="700">
          Add New Thread
        </Text>
        <Form form={form} onSubmit={(val : NewThreadRequest) => onSubmit(val)}>
          <Flex direction="column" gap={10}>
            <TextInput
              label="Title"
              placeholder="Title"
              key={form.key("title")}
              {...form.getInputProps("title")}
              withAsterisk
            />
            <TextInput
              label="Body"
              placeholder="Body"
              key={form.key("body")}
              {...form.getInputProps("body")}
              withAsterisk
            />
            <TextInput
              label="Category"
              placeholder="Category"
              key={form.key("category")}
              {...form.getInputProps("category")}
            />
            <Button type="submit" color='red'>Add</Button>
          </Flex>
        </Form>
      </Dialog>
    );

}

export default AddThreadDialog