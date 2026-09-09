// src/data/extended/technology.ts
import type { CalculatorEntry } from '../calculatorRegistry';

export const technologyCalculators: CalculatorEntry[] = [
  {
    id: 'bandwidth-calculator',
    category: 'technology',
    name: 'Bandwidth Calculator',
    title: 'Free Bandwidth Calculator — Network Throughput & Download Time',
    description: 'Calculate file transfer durations and required network bandwidth speeds across gigabit fiber, broadband, and cloud infrastructure.',
    badge: 'Network Physics',
    badgeColor: 'text-cyan border-cyan/30 bg-cyan/10',
    formula: {
      name: 'Data Transfer Speed Equation',
      expression: 'Time (seconds) = [File Size (GB) × 8 × 1024] ÷ Network Speed (Mbps)',
      explanation: 'Converts byte storage units (Bytes) to transmission throughput units (bits) factoring in communication line overhead.',
      variables: [
        { symbol: 'Mbps', meaning: 'Megabits per second (1 Byte = 8 bits)' },
      ],
    },
    example: {
      title: 'Worked Example: 50 GB 4K Video on 100 Mbps',
      scenario: 'Transferring a 50 Gigabyte file across a 100 Megabit per second internet connection.',
      steps: [
        {
          number: 1,
          title: 'Convert GB to Megabits',
          description: '50 GB × 8,192 Megabits/GB = 409,600 Megabits.',
          mathExpression: '409,600 Mb',
        },
        {
          number: 2,
          title: 'Calculate Duration',
          description: '409,600 Mb ÷ 100 Mbps = 4,096 seconds (1 hr 8 min 16 sec).',
          mathExpression: '1 hr 8 min',
        },
      ],
      conclusion: 'The download completes in 1 hour, 8 minutes, and 16 seconds.',
    },
    faqs: [
      {
        question: 'Why is download speed slower than ISP advertised speed?',
        answer: 'Internet Service Providers advertise theoretical physical layer speeds in bits (Mbps), while protocol headers (TCP/IP overhead) and network congestion reduce real-world throughput by 10%-15%.',
      },
    ],
    inputs: [
      { id: 'file_size_gb', label: 'File Size (Gigabytes)', type: 'number', defaultValue: 50, min: 0.001, max: 1000000, step: 0.1, unit: 'GB' },
      { id: 'speed_mbps', label: 'Connection Speed (Megabits/sec)', type: 'number', defaultValue: 100, min: 0.1, max: 100000, unit: 'Mbps' },
    ],
    defaultResult: {
      label: 'Transfer Duration (Minutes)',
      initialValue: 68.27,
      decimals: 2,
      secondaryText: 'Formatted Time: 1 hour, 8 minutes, 16 seconds',
      suffix: ' mins',
      accent: 'cyan',
    },
    computeScript: `
      const sizeGB = Math.max(0.001, Number(inputs.file_size_gb) || 50);
      const speedMbps = Math.max(0.01, Number(inputs.speed_mbps) || 100);
      const totalBits = sizeGB * 8 * 1024;
      const seconds = totalBits / speedMbps;
      const minutes = seconds / 60;
      const hours = Math.floor(seconds / 3600);
      const remainingMinutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = Math.round(seconds % 60);

      let formatted = '';
      if (hours > 0) formatted += hours + ' hr ';
      formatted += remainingMinutes + ' min ' + remainingSeconds + ' sec';

      return {
        value: minutes,
        secondaryText: 'Estimated Duration: ' + formatted + ' (' + Math.round(seconds) + ' total sec)',
        badge: 'Throughput Math'
      };
    `,
  },
  {
    id: 'data-transfer-calculator',
    category: 'technology',
    name: 'Data Transfer Time',
    title: 'Free Data Transfer Calculator — Backup & Cloud Migration Duration',
    description: 'Estimate total gigabytes moved and completion timelines for server migrations, local SSD backups, and WAN syncs.',
    badge: 'Storage & Backup',
    badgeColor: 'text-link border-link/30 bg-link/10',
    formula: {
      name: 'Total Data Ingestion Formula',
      expression: 'Total Data (GB) = [Throughput Rate (MB/s) × Duration (seconds)] ÷ 1024',
      explanation: 'Determines aggregate payload delivered over a sustained operational transfer window.',
      variables: [
        { symbol: 'MB/s', meaning: 'Megabytes per second sustained write throughput' },
      ],
    },
    example: {
      title: 'Worked Example: 250 MB/s SSD Transfer for 30 Minutes',
      scenario: 'Writing sustained data at 250 MB/s for 30 minutes.',
      steps: [
        {
          number: 1,
          title: 'Calculate Seconds',
          description: '30 minutes × 60 = 1,800 seconds.',
          mathExpression: '1,800 sec',
        },
        {
          number: 2,
          title: 'Calculate Total Data',
          description: '(250 MB/s × 1,800 sec) ÷ 1,024 = 439.45 GB.',
          mathExpression: '439.45 GB',
        },
      ],
      conclusion: 'Total data transferred is 439.45 GB.',
    },
    faqs: [
      {
        question: 'What is the difference between MB/s and Mbps?',
        answer: 'MB/s (capital B) measures Megabytes per second (storage), while Mbps (lowercase b) measures Megabits per second (networking). 1 MB/s equals 8 Mbps.',
      },
    ],
    inputs: [
      { id: 'transfer_rate_mbs', label: 'Transfer Speed (Megabytes/sec)', type: 'number', defaultValue: 250, min: 0.1, max: 10000, unit: 'MB/s' },
      { id: 'duration_minutes', label: 'Transfer Window Duration', type: 'number', defaultValue: 30, min: 1, max: 100000, unit: 'mins' },
    ],
    defaultResult: {
      label: 'Total Data Transferred',
      initialValue: 439.45,
      decimals: 2,
      secondaryText: 'Speed in networking terms: 2,000 Mbps (2.0 Gbps)',
      suffix: ' GB',
      accent: 'link',
    },
    computeScript: `
      const mbs = Math.max(0.1, Number(inputs.transfer_rate_mbs) || 250);
      const mins = Math.max(1, Number(inputs.duration_minutes) || 30);
      const sec = mins * 60;
      const totalMB = mbs * sec;
      const totalGB = totalMB / 1024;
      const mbps = mbs * 8;
      return {
        value: totalGB,
        secondaryText: 'Network equivalent: ' + mbps.toFixed(0) + ' Mbps (' + (mbps / 1000).toFixed(2) + ' Gbps) | Total MB: ' + Math.round(totalMB).toLocaleString(),
        badge: 'Verified Throughput'
      };
    `,
  },
];
