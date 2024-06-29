import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { toast } from "sonner";
export function Dropdown({ id }: { id: number }) {
  const navigate = useNavigate();

  const handleDelete = async (id: number) => {
    console.log("hello world");
    try {
      const responese = await axios.put(
        "http://localhost:3000/api/v1/delete/" + id
      );
      console.log("responce delete" + responese.data);
      toast.success("successfully deleted");
    } catch (error) {
      console.log(error);
      toast.error("Some thing want worng");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem onClick={() => navigate("/dashboard/edit/" + id)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate("/dashboard/view/" + id)}>
          view
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            handleDelete(id);
          }}
        >
          delete
        </DropdownMenuItem>
        <DropdownMenuItem>Add project</DropdownMenuItem>
        <DropdownMenuItem>Add monthly salary</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
