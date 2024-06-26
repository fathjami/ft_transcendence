'use client';
import { useState, useEffect, useCallback } from 'react';

import { useSocket } from '../../../contexts/socketContext';
import Game from '../../../components/game/Game';
import CostumizeGame from '@/components/game/CostumizeGame';
import { RxExit } from 'react-icons/rx';
import Link from 'next/link';
import PlayerNotFound from '@/components/game/PlayerNotFound';
import YouWon from '@/components/game/YouWon';
import YouLose from '@/components/game/YouLose';
import { User } from '@/components/userProfile/types';
import getCurrentUser from '@/services/getCurrentUser';
import { useRouter } from 'next/navigation';
import GameImages from '@/components/game/gameImages';

const DEFAUL_TCOLOR: string = '#000000';

const PlayPage = ({ params }: { params: { gameRoom: string } }) => {
  const { socket } = useSocket();
  const router = useRouter();
  const [isWaiting, setIsWaiting] = useState(false);
  const [bgColor, setBgColor] = useState<string>(DEFAUL_TCOLOR);
  const [playerNotFound, setPlayerNotFound] = useState(false);
  const [{ gameisFinished, youWon }, setGameisFinished] = useState({
    gameisFinished: false,
    youWon: false,
  });
  const [currentUser, setCurrentUser] = useState<User>({
    id: null,
    username: '',
    url: '',
    stats: {
      exp: 0,
      level: 0,
      wins: 0,
      losses: 0,
    },
    me: false,
    games: [],
    isFriend: false,
    friends: [],
  });

  useEffect(() => {
    getCurrentUser().then((res) => {
      if (res) {
        setCurrentUser(res);
      }
    });
  }, [gameisFinished]);

  const [GameInfo, setgameInfo] = useState({
    position: '',
    OpponentId: 0,
  });

  const handlePlayClick = () => {
    setIsWaiting(true);
    if (params.gameRoom[0] !== '0') socket?.emit('joinRoom', params.gameRoom);
    else socket?.emit('joinQueue');
  };

  useEffect(() => {
    const handleOpponentFound = (opponentInfo: {
      playerPosition: string;
      opponentId: number;
      username: string;
    }) => {
      setgameInfo({
        position: opponentInfo.playerPosition,
        OpponentId: opponentInfo.opponentId,
      });
      setIsWaiting(false);
    };
    socket?.on('start-game', handleOpponentFound);

    socket?.on('nta-wahid', () => {
      setPlayerNotFound(true);
    });

    socket?.on('already-in-the-game', () => {
      setIsWaiting(false);
    });

    socket?.on('Game-is-finished', (state) => {
      setGameisFinished({ gameisFinished: true, youWon: state.youWon });
    });

    return () => {
      if (socket) {
        socket.off('Game-is-finished', () => {});
        socket.off('start-game', handleOpponentFound);
        socket?.off('nta-wahid');
        socket?.off('already-in-the-game');
      }
    };
  }, [socket]);

  return (
    <div className={`flex justify-center w-full h-full`}>
      <Link href="/dashboard">
        <RxExit className="md:h-10 md:w-8 text-white/80 absolute md:top-4 top-1 md:right-4 right-2 h-8 w-6" />
      </Link>
      {GameInfo.OpponentId === 0 && (
        <div className=" flex flex-col justify-center w-full h-full md:gap-20 gap-4">
          <div className="text-center p-4 flex justify-center">
            <CostumizeGame setBgColor={setBgColor} />
          </div>
          <button
            onClick={handlePlayClick}
            disabled={isWaiting}
            className={`text-white 
                            mx-auto
                            bg-[#6257FE]
                            md:px-[2.8rem]
                            md:py-[0.6rem]
                            px-[2.5rem]
                            py-[0.5rem]
                            rounded-[0.6rem]
                            font-semibold
                            text-md
                            md:text-2xl
                            shadow-[inset_0_12px_11px_rgba(255,255,255,0.26)]
                            ${isWaiting ? 'opacity-50 cursor-not-allowed' : ''}
      `}
          >
            Play
          </button>
          {playerNotFound && (
            <div
              className={`absolute w-full h-full flex justify-center ${playerNotFound && 'blur-container'} z-10`}
              onClick={() => {
                window.location.reload();
              }}
            >
              <PlayerNotFound />
            </div>
          )}
        </div>
      )}

      {gameisFinished && (
        <div
          className={`absolute w-full h-full flex justify-center ${gameisFinished && 'blur-container'} z-10 `}
          onClick={() => {
            // window.location.reload();
            router.push('/dashboard');
          }}
        >
          {(youWon && <YouWon user={currentUser} />) ||
            (!youWon && <YouLose user={currentUser} />)}
        </div>
      )}

      {!isWaiting && GameInfo.OpponentId !== 0 && (
        <div className="w-full h-full flex flex-col justify-center gap-1">
          <div className=" w-full max-w-[1428px] gap-4 pt-2 p-1 self-center max-[500px]:mt-40">
            <GameImages
              position={GameInfo.position}
              opponentId={GameInfo.OpponentId}
              currentUser={currentUser}
            />
          </div>
          <Game position={GameInfo.position} color={bgColor} />
        </div>
      )}
    </div>
  );
};

export default PlayPage;
