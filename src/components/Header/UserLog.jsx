// export default function UserLog() {
//   return (
//     <button className="flex flex-row log-btn items-center justify-between w-[7%]">
//       <img className="w-6 h-6" src="/src/assets/icons/notification_bell.png" alt="notifications" />
//       <div className="flex flex-row items-center">
//         <img className="w-6 h-6" src="/src/assets/icons/user.png" alt="user" />
//         <img className="w-4 h-4" src="/src/assets/icons/arrow-down.png" alt="" />
//       </div>
//     </button>
//   );
// }
export default function UserLog() {
  return (
    <div className="flex gap-5 justify-between w-auto">
      <button>
        <img className="w-6 h-6" src="/src/assets/icons/notification_bell.png" alt="notifications" />
      </button>
      <button className="flex flex-row log-btn items-center justify-between w-[auto]">
        <div className="flex flex-row items-center">
          <img className="w-6 h-6" src="/src/assets/icons/user.png" alt="user" />
          <img className="w-4 h-4" src="/src/assets/icons/arrow-down.png" alt="" />
        </div>
      </button>
    </div>
  );
}
