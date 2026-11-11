# Lab title

> One sentence: what was built and what it demonstrates.

| | |
|---|---|
| Status | Building / Write-up in progress / Published |
| Category | PKI/TLS, Detection, Cloud, AppSec, Automation or Offensive |
| Date | YYYY-MM |
| Repository | link |
| Time spent | approx. hours |
| Stack | tools and versions |

## 1. Goal

What question does this lab answer, or which skill does it prove? Write it so a hiring manager
understands it in ten seconds. State what is out of scope.

## 2. Architecture

A diagram first (draw.io, Excalidraw or Mermaid exported to PNG/SVG), then a few lines of explanation.

```
[ component A ] --protocol/port--> [ component B ] --> [ component C ]
```

- Hosts, networks and trust boundaries
- Where secrets and keys live
- Where logs go

## 3. Threat model: what this proves

- Assets: what is being protected
- Threats considered: who attacks, and how
- Assumptions and what is NOT covered
- The claim: "After this lab, X is prevented / detected / automated, and here is the evidence."

## 4. Build steps

Numbered, reproducible steps. Commands in code blocks, with the important output. Link to the files in
the repository instead of pasting long configurations. Never include real secrets, keys or customer data.

1. Step
2. Step
3. Step

## 5. Detections or controls

One row per detection or control. Map each to MITRE ATT&CK where it applies.

| # | Detection / control | ATT&CK tactic | Technique (ID) | Data source | Logic (query or rule) | Tested with |
|---|---|---|---|---|---|---|
| 1 | | | | | | |
| 2 | | | | | | |

For controls that are not detections (for example mTLS, short-lived certificates, IAM policy), replace the
ATT&CK columns with the standard or benchmark they satisfy.

## 6. Evidence

Screenshots, query results, pipeline runs and packet captures that back up section 5. Each item needs a
caption that says what it shows. Redact hostnames, IPs and names that are not yours.

## 7. Results and metrics

Only numbers that were actually measured, with how they were measured.

- Coverage: how many simulated techniques were detected, out of how many
- False positives seen during testing
- Time: certificate lifetime, renewal time, pipeline duration, time to detect
- Cost, if cloud resources were used

## 8. What broke and what I learned

The honest part. What failed, how it was diagnosed, what the fix was, and what would be done
differently next time.

## 9. Next steps

- Improvement
- Improvement

## References

- Documentation, standards and articles used
