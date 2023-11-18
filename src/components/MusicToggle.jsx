import useAppContext from "@contexts/AppContext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import { Box } from "@mui/material";
import { useCallback } from "react";
import Sound from "react-sound";

const MusicToggle = () => {
  const { music, musicPlayState, playMusic, pauseMusic } = useAppContext();

  const handleClick = useCallback(() => {
    if (musicPlayState === Sound.status.PLAYING) {
      pauseMusic();
    }
    if (musicPlayState === Sound.status.PAUSED) {
      playMusic();
    }
  }, [musicPlayState, playMusic, pauseMusic]);

  if (!music) return null;

  return (
    <Box
      onClick={handleClick}
      sx={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        zIndex: 100,
        height: "30px",
        width: "30px",
        cursor: "pointer",
        "& svg": {
          height: "100%",
          width: "100%",
        },
        "& .music-icon": {
          position: "absolute",
          top: 0,
          opacity: 0,
        },
        "& .music-icon--active": {
          opacity: 1,
        },
        "& .music-icon--in-active": {
          opacity: 0,
        },

        "&:hover .music-icon--active": {
          opacity: 0,
        },
        "&:hover .music-icon--in-active": {
          opacity: 1,
        },
      }}
    >
      {/* {musicPlayState === Sound.status.PLAYING ? ( */}
      <MusicNoteIcon
        // position="absolute"
        top="0"
        className={
          musicPlayState === Sound.status.PLAYING
            ? "music-icon music-icon--active"
            : "music-icon music-icon--in-active"
        }
      />
      {/* // ) : ( */}
      <MusicOffIcon
        // position="absolute"
        className={
          musicPlayState !== Sound.status.PLAYING
            ? "music-icon music-icon--active"
            : "music-icon music-icon--in-active"
        }
      />
      {/* // )} */}
    </Box>
  );
};

export default MusicToggle;
