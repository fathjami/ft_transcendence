import { useSocket } from '@/contexts/socketContext';
import getCurrentUser from '@/services/getCurrentUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
// Importing toastify module
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
 
// Import toastify css file

const InvitePopup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { socket } = useSocket();
  const router = useRouter();
  const [inviter, setInviter] = useState<{room:string, userId: Number, username: string }>({room:'', userId: 0, username: '' });
  const [currentUser, setCurrentUser] = useState<{
    id: number;
    username: string;
  }>();

  const refuseInvitation = () => {
    setShowPopup(false);
    socket?.emit('inviteResponse',  {response: false, gameRoom: inviter.room, inviter: inviter.userId});
  };

  const acceptInvitation = () => {
    setShowPopup(false);
    socket?.emit('inviteResponse', {response: true,gameRoom: inviter.room,inviter: inviter.userId});
    router.push(`/play/${inviter.room}`);
  };


  useEffect(()=>{
    getCurrentUser().then((res : { id: number, username: string }) => {
      if (res) {
        setCurrentUser(res);
      }
    });
  },[])

  useEffect(() => {
    if (socket) console.log(socket);
    socket?.on('game-invite', (data) => {
      console.log('data', data);
      setInviter({room:data.room, userId: data.userId, username: data.username });
      setShowPopup(true);
    });

    socket?.on('inviteResponse', (data)=>{
      console.log('invite response reveived ', data);
      if (data.response){
        router.push(`/play/${data.room}`);
      }
      else {
        toast.info("Invitation refused");
        console.log('invitation refused');
      }
    })

    socket?.on('invited not available',()=>{
      toast.error("invited not available");
      console.log('invited not available');
    })

    return () => {
      socket?.off('game-invite');
      socket?.off('invited not available');
    };
  }, [socket]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 text-white text-center font-serif gap-3
      ${!showPopup && 'hidden'}`}
    >
      <div className="md:w-[35rem] md:h-[18rem] border-2 border-purple-900 self-center bg-[#17194A] rounded-[3.5rem] flex flex-col gap-8 justify-center  shadow-lg bg-origin-padding">
        <img
          src={inviter?.userId ? process.env.BACKEND + `/api/users/${inviter?.userId}/avatar`: ''}
          alt="player"
          width={200}
          height={200}
          className="w-20 h-20 rounded-xl self-center"
        />
        <p>
          Hey {currentUser?.username}, {inviter.username} has challenged you to a
          thrilling game of ping pong. Are you up for the challenge? Accept and
          let the games begin!
        </p>
        <div className="flex flex-row self-center">
          <button
            type="button"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={acceptInvitation}
          >
            accept
          </button>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={refuseInvitation}
          >
            refuse
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitePopup;