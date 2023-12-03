import useAppContext from "@contexts/AppContext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import { Box } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import Sound from "react-sound";

const MusicToggle = () => {
  const { music, musicPlayState, playMusic, pauseMusic } = useAppContext();
  const [hovering, setHovering] = useState(false);

  const handleClick = useCallback(() => {
    setHovering(false);
    if (musicPlayState === Sound.status.PLAYING) {
      pauseMusic();
    }
    if (musicPlayState === Sound.status.PAUSED) {
      playMusic();
    }
  }, [musicPlayState, playMusic, pauseMusic]);

  const Icon = useMemo(() => {
    if (musicPlayState === Sound.status.PLAYING) {
      return hovering ? MusicOffIcon : MusicNoteIcon;
    }

    return hovering ? MusicNoteIcon : MusicOffIcon;
  }, [musicPlayState, hovering]);

  if (!music) return null;

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "fixed",
        top: {
          xs: "0.9rem",
          md: "1.5rem",
        },
        right: "1.5rem",
        zIndex: 100,
        height: "30px",
        width: "30px",
        cursor: "pointer",
        "& svg": {
          height: "100%",
          width: "100%",
        },
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Icon top="0" />
    </Box>
  );
};

export default MusicToggle;
