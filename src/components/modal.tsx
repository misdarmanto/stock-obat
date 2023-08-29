import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
interface IModelType {
    open:boolean
    setOpen: (item:boolean) => void
    onYes: () => void,
    onNo: () => void,
    title: string,
    body:string
}

export function ModalStyle(props: IModelType) { 
  const handleOpen = () => props.setOpen(!props.open);
  return (
      <Dialog open={props.open} handler={handleOpen}>
        <DialogHeader>{props.title}</DialogHeader>
        <DialogBody divider>
          {props.body}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
                props.onNo()
                handleOpen()
            }}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="outlined" color="blue" onClick={() => {
            props.onYes()
            handleOpen()
          }}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
  );
}