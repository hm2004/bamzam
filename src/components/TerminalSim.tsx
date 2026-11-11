import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

interface TerminalSimProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenInquiry: () => void;
  onOpenBooking: () => void;
}

interface CommandLog {
  command: string;
  output: string;
  isError?: boolean;
}

export const TerminalSim: React.FC<TerminalSimProps> = ({
  isOpen,
  onClose,
  onOpenInquiry,
  onOpenBooking,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      command: 'sysinfo',
      output:
        'Hervie Mariano Network OS v2.0.26 (Antipolo, Rizal node)\nArchitecture: Cisco IOS / Linux Kernel 6.8 / Docker Engine\nType "help" for a list of available diagnostic commands.',
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const lower = cmd.toLowerCase();
    let response = '';

    if (lower === 'help') {
      response = `AVAILABLE COMMANDS:
  help             - Show this help manual
  whoami           - Display administrator identity and current role
  ping <target>    - Test ICMP latency to an IP or host
  traceroute <tgt> - Trace network hops
  cisco-show-ip    - Simulate Cisco IOS 'show ip interface brief'
  cat skills.txt   - Display core networking and IT proficiencies
  schedule         - Launch appointment booking modal
  inquire          - Launch project inquiry modal
  clear            - Wipe terminal buffer
  exit             - Close terminal window`;
    } else if (lower === 'whoami') {
      response = `User: Hervie Keithrick Mariano
Title: Network Administrator | QA Coach | Fraud Analyst
Education: ICCT Colleges BSIT (2022-2026)
Location: Antipolo City, Rizal, Philippines
Status: Online & Ready for hire`;
    } else if (lower.startsWith('ping')) {
      const target = cmd.split(' ')[1] || '8.8.8.8';
      response = `PING ${target} (56 data bytes):
64 bytes from ${target}: icmp_seq=1 ttl=118 time=8.42 ms
64 bytes from ${target}: icmp_seq=2 ttl=118 time=7.95 ms
64 bytes from ${target}: icmp_seq=3 ttl=118 time=8.10 ms
--- ${target} ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, rtt avg = 8.15 ms`;
    } else if (lower.startsWith('traceroute')) {
      const target = cmd.split(' ')[1] || 'icct.edu.ph';
      response = `traceroute to ${target} (103.112.20.1), 30 hops max:
 1  gateway.local (192.168.1.1)  1.21 ms  0.98 ms
 2  pldt-core-gw.net.ph (119.92.0.1)  4.32 ms  4.11 ms
 3  edge-switch-antipolo.ph (120.28.14.9)  8.12 ms  7.94 ms
 4  ${target} (103.112.20.1)  12.05 ms  11.89 ms
Trace complete. Latency optimal.`;
    } else if (lower === 'cisco-show-ip' || lower === 'show ip interface brief') {
      response = `Interface              IP-Address      OK? Method Status                Protocol
GigabitEthernet0/0/0   192.168.10.1    YES NVRAM  up                    up      
GigabitEthernet0/0/1   10.0.0.1        YES NVRAM  up                    up      
Vlan10 (Admin)         172.16.10.254   YES NVRAM  up                    up      
Vlan20 (Lab Workstations) 172.16.20.254 YES NVRAM up                    up      
Loopback0              1.1.1.1         YES NVRAM  up                    up`;
    } else if (lower.includes('skill')) {
      response = `=== CORE PROFICIENCIES ===
[Networking]  Cisco OSPF, EIGRP, VLAN Segmentation, Subnetting, Hardware diagnostics
[Systems]     Ubuntu Server, Debian, Docker, Kubernetes, Nginx, WireGuard
[Quality/Risk] Root Cause Coaching (40+ agents), Transaction Fraud Analysis, CSAT
[Programming] Python scripting, Shell/Bash, Java, IoT C++ (Arduino/ESP32)`;
    } else if (lower === 'schedule' || lower === 'book') {
      response = 'Opening consultation appointment modal...';
      onOpenBooking();
    } else if (lower === 'inquire' || lower === 'contact') {
      response = 'Opening client inquiry modal...';
      onOpenInquiry();
    } else if (lower === 'clear') {
      setLogs([]);
      setInputVal('');
      return;
    } else if (lower === 'exit' || lower === 'quit') {
      onClose();
      return;
    } else {
      response = `Command not recognized: "${cmd}". Type "help" for command syntax.`;
    }

    setLogs((prev) => [...prev, { command: cmd, output: response }]);
    setInputVal('');
  };

  return (
    <div className="mb-8 animate-in fade-in zoom-in-95 duration-150">
      <div
        className={`bg-slate-950 text-emerald-400 border-[var(--border-thick)] rounded-[var(--radius-md)] shadow-[var(--shadow-xl)] overflow-hidden font-mono-code ${
          isExpanded ? 'h-[480px]' : 'h-[320px]'
        } flex flex-col transition-all`}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border-b border-slate-700 text-slate-300 text-xs select-none">
          <div className="flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">bash: hervie@antipolo-gw:~</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white"
              title={isExpanded ? 'Minimize' : 'Maximize'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1 hover:bg-red-900/60 rounded text-slate-400 hover:text-red-400"
              title="Close Terminal"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Terminal Buffer */}
        <div className="flex-1 p-3.5 overflow-y-auto text-xs leading-relaxed space-y-2.5 selection:bg-emerald-500 selection:text-black">
          {logs.map((log, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="text-cyan-400">hervie@gateway</span>
                <span className="text-slate-500">:</span>
                <span className="text-yellow-400">~</span>
                <span className="text-emerald-400">$</span>
                <span className="text-slate-100 font-bold">{log.command}</span>
              </div>
              <pre className="whitespace-pre-wrap font-mono-code text-emerald-300/90 pl-3 border-l-2 border-emerald-800/60">
                {log.output}
              </pre>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Input Line */}
        <form
          onSubmit={handleCommand}
          className="flex items-center gap-2 px-3 py-2 bg-slate-900/90 border-t border-slate-800"
        >
          <span className="text-cyan-400 text-xs">hervie@gateway</span>
          <span className="text-emerald-400 font-bold text-xs">$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type command (e.g. 'help', 'ping 8.8.8.8', 'schedule', 'cat skills.txt')..."
            className="flex-1 bg-transparent border-none outline-none text-emerald-300 font-mono-code text-xs placeholder:text-slate-600 focus:ring-0"
          />
          <button
            type="submit"
            className="text-[10px] bg-emerald-500 text-black font-bold px-2 py-0.5 rounded hover:bg-emerald-400"
          >
            EXEC
          </button>
        </form>
      </div>
    </div>
  );
};
