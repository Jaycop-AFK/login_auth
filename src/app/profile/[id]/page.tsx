import { Typography } from "@mui/material";

interface Params {
  id: string;
}

export default function UserProfile({params}: { params: Params }) {
  return (
    <>
    <Typography variant="body1" color="initial">HEY {params.id}</Typography>

    </>
  )
}