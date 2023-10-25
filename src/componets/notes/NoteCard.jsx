import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import React from "react";
import { UpdateBox, DeleteBox } from "./Popup";

const NoteCard = ({ title, message, id }) => {
  return (
    <Box
      width={300}
      height={300}
      bgcolor="#fff580"
      borderRadius={2}
      position="relative"
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin={2}
    >
      <Typography
        variant="h5"
        textTransform="capitalize"
        textAlign="left"
        fontWeight={600}
      >
        {title}
      </Typography>
      <Typography
        textAlign="left"
        sx={{ wordWrap: "break-word", whiteSpace: "normal", width: "100%" }}
      >
        {message}
      </Typography>
      <Stack
        direction="row"
        justifyContent="space-between"
        position="absolute"
        bottom={0}
        width="90%"
        alignItems="center"
        padding={1}
      >
        <Tooltip title="Edit note">
          <IconButton>
            <UpdateBox editId={id} title={title} message={message} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete note">
          <IconButton>
            <DeleteBox deleteId={id} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default NoteCard;
