import { Box, Center, Loader, LoadingOverlay } from "@mantine/core"

export const Loading = () => {
    return (
      <Box pos="relative" style={{ top : 200, left : 600 }}>
        <Loader
          color='red'
        />
      </Box>
    );
}