/*
 * Site content for the Labs and Certifications sections.
 *
 * This is the single source of truth. After editing, run
 *   node tools/build-static.mjs
 * to refresh the no-JavaScript fallback inside index.html.
 *
 * Lab fields
 *   id          unique, used as the HTML id (anchor target)
 *   title       short name
 *   summary     one line
 *   category    one of: "PKI/TLS", "Detection", "Cloud", "AppSec", "Automation", "Offensive"
 *   status      one of: "Published", "Write-up in progress", "Building", "Planned"
 *   tags        array of short strings
 *   highlights  optional array of short bullet strings (shown under the summary)
 *   links       optional { repo: "https://...", writeup: "https://..." } ; leave "" when there is none
 */
window.PORTFOLIO = {
  labGroups: [
    {
      id: "featured",
      title: "Featured labs",
      note: "My three flagship labs. Each one is marked with its real status: planned labs show design goals, not results, and get a repository and a full write-up once they are built.",
      layout: "featured",
      items: [
        {
          id: "flagship-1",
          title: "Private PKI as code: ACME, mTLS and 24-hour certificates",
          summary: "A two-tier private CA on step-ca that issues 24-hour certificates over ACME to Nginx, with mutual TLS for clients, automated renewal and expiry monitoring. Built and tested on Kali Linux.",
          category: "PKI/TLS",
          status: "Published",
          tags: ["step-ca", "ACME", "mTLS", "Nginx", "OpenSSL", "Bash"],
          highlights: [
            "ECDSA root (10 years) and intermediate (5 years), and step-ca runs without the root key",
            "mTLS tested: no client certificate gets 400, a valid one gets in",
            "Renewal daemon with Nginx reload, a CA-outage drill and a cron monitor that alerts on expiry and CA health"
          ],
          links: { repo: "https://github.com/rocha-29/private-pki-lab", writeup: "https://github.com/rocha-29/private-pki-lab#readme" }
        },
        {
          id: "flagship-2",
          title: "Detection-as-code pipeline with attack simulation",
          summary: "Goal: versioned Sigma rules, tested in CI against recorded attack telemetry and deployed to Splunk, each mapped to MITRE ATT&CK with a runbook.",
          category: "Detection",
          status: "Planned",
          tags: ["Splunk", "Sigma", "Sysmon", "Atomic Red Team", "GitHub Actions", "MITRE ATT&CK"],
          highlights: [
            "Each rule ships with true-positive and benign test fixtures",
            "GitHub Actions lints, tests, converts and deploys rules on merge",
            "ATT&CK Navigator coverage layer and false-positive tuning notes"
          ],
          links: { repo: "", writeup: "" }
        },
        {
          id: "flagship-3",
          title: "AWS security baseline in Terraform, attacked and detected",
          summary: "Goal: a hardened AWS account defined entirely in Terraform, then tested with simulated cloud attacks to check that logging, detections and automated remediation hold up.",
          category: "Cloud",
          status: "Planned",
          tags: ["AWS", "Terraform", "CloudTrail", "GuardDuty", "Prowler", "Lambda"],
          highlights: [
            "Least-privilege IAM with no long-lived keys, IMDSv2 and SSM instead of SSH",
            "Before and after posture scans with Prowler",
            "CloudTrail detections and Lambda auto-remediation for simulated attack techniques"
          ],
          links: { repo: "", writeup: "" }
        }
      ]
    },
    {
      id: "hands-on",
      title: "Hands-on work",
      note: "Work I have done but not yet published. Write-ups are on the way.",
      layout: "rows",
      items: [
        {
          id: "tls-deployment",
          title: "TLS certificate deployment on four web servers",
          summary: "Certificates deployed on Apache, Nginx, IIS and Tomcat running on AWS EC2: CSR generation, chain assembly, and JKS and PKCS12 keystores.",
          category: "PKI/TLS",
          status: "Write-up in progress",
          tags: ["Apache", "Nginx", "IIS", "Tomcat", "AWS EC2", "OpenSSL"],
          links: { repo: "", writeup: "" }
        },
        {
          id: "snort-iptables",
          title: "Snort IDS rules with iptables",
          summary: "Custom Snort IDS rules written and tested alongside iptables firewall rules.",
          category: "Detection",
          status: "Write-up in progress",
          tags: ["Snort", "iptables", "IDS"],
          links: { repo: "", writeup: "" }
        },
        {
          id: "security-onion-rig-ek",
          title: "Malware traffic analysis in Security Onion",
          summary: "Analysis of a RIG Exploit Kit infection capture in Security Onion, with log normalization in AWK.",
          category: "Detection",
          status: "Write-up in progress",
          tags: ["Security Onion", "RIG Exploit Kit", "AWK", "Traffic analysis"],
          links: { repo: "", writeup: "" }
        },
        {
          id: "hack-the-box",
          title: "Hack The Box practice",
          summary: "Ongoing practice on Hack The Box to build offensive security fundamentals.",
          category: "Offensive",
          status: "Write-up in progress",
          tags: ["Hack The Box"],
          links: { repo: "", writeup: "" }
        }
      ]
    },
    {
      id: "earlier",
      title: "Earlier projects (2025)",
      note: "Small Python learning projects from 2025. They are simple on purpose, and the code is public.",
      layout: "rows",
      items: [
        {
          id: "port-scanner",
          title: "port-scanner",
          summary: "Multithreaded TCP connect scanner in Python.",
          category: "Offensive",
          status: "Published",
          tags: ["Python", "Sockets", "Threading"],
          links: { repo: "https://github.com/rocha-29/port-scanner", writeup: "" }
        },
        {
          id: "secure-login-system",
          title: "secure_login_system",
          summary: "Flask login demo with Werkzeug password hashing, a password policy and a Fernet-encrypted user store.",
          category: "AppSec",
          status: "Published",
          tags: ["Python", "Flask", "Werkzeug", "Fernet"],
          links: { repo: "https://github.com/rocha-29/secure_login_system", writeup: "" }
        },
        {
          id: "security-header-checker",
          title: "vulnerability_scanner",
          summary: "A security header checker: reads HTTP security headers and the server banner of a target URL. Despite the repository name, it is not a full vulnerability scanner.",
          category: "AppSec",
          status: "Published",
          tags: ["Python", "HTTP headers"],
          links: { repo: "https://github.com/rocha-29/vulnerability_scanner", writeup: "" }
        },
        {
          id: "password-cracker",
          title: "password_cracker",
          summary: "Educational SHA-256 dictionary and brute-force demo.",
          category: "Offensive",
          status: "Published",
          tags: ["Python", "SHA-256", "Educational"],
          links: { repo: "https://github.com/rocha-29/password_cracker", writeup: "" }
        }
      ]
    }
  ],

  /* Set verifyUrl to the public verification page of each credential. The "Verify" link only appears when it is set. */
  certifications: [
    { name: "Certified in Cybersecurity (CC)", issuer: "ISC2", date: "Jan 2026", verifyUrl: "" },
    { name: "CyberOps Associate", issuer: "Cisco", date: "Jan 2026", verifyUrl: "" },
    { name: "Splunk Fundamentals", issuer: "Splunk", date: "Nov 2025", verifyUrl: "" },
    { name: "Cloud Computing Fundamentals", issuer: "IBM", date: "Jun 2025", verifyUrl: "" },
    { name: "Junior Cybersecurity Analyst", issuer: "Cisco", date: "Apr 2025", verifyUrl: "" }
  ]
};
