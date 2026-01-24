# A Framework for Identifying and Moderating Cognitively Addictive Content Patterns

## 1. Introduction: The Need for Cognitive Awareness

The modern digital environment is defined by a relentless competition for user attention. To succeed, content platforms and creators have evolved a sophisticated toolkit of "hooks" (techniques to stop scrolling) and "themes" (content genres that sustain engagement) designed to trigger deep-seated psychological mechanisms.

While this has led to highly engaging content, it has also fostered an ecosystem of "mindless scrolling," digital addiction, and a loss of user agency. Users can feel trapped by algorithms that feed them content not because it is fulfilling, but because it is effective at holding their attention.

This document proposes a system to understand, identify, and selectively moderate these social media patterns and themes.

The foundation of this system is the set of taxonomies for [Social Media Hooks](taxonomies/social-media-hooks.json) (the 1-3 second "snare") and [Cognitively Addictive Themes](taxonomies/cognitively-addictive-themes.json) (the long-form "loop"). These taxonomies provide a structured, machine-readable language to describe how content captures our attention, moving beyond simple topic-based keywords.

Additionally, it seems that moderation and legal reporting cannot be trusted to the networks anymore (Bad UIs intentionally slowing down legal reporting, and native UI being reserved to the lax self-moderation systems). A system is proposed to address that.

## 2. Rationale: From Topics to Mechanisms

Current content filters are primitive. They allow users to block topics (e.g., keywords like "politics," "crypto") but not mechanisms. This is a critical flaw. A user may be interested in a nuanced political discussion but wish to avoid content designed to make them outraged.

This system's rationale is to acknowledge and target the cognitive mechanisms used to foster addictive engagement.

By classifying content using the provided taxonomies, we can empower users with granular control:

- **Blocking Hooks**: A user could choose to filter out content that begins with a `provocation_controversy` hook (e.g., "Unpopular opinion..."), reducing their exposure to "rage-bait" and manufactured conflict.
- **Moderating Themes**: A user could rate-limit their consumption of `low_cognitive_load` themes (e.g., "Brainrot," "Sludge Content") to encourage more mindful consumption, or limit `transformation_renovation` content if they find it's making them feel dissatisfied with their own home.

This shifts control from the platform's algorithm (which optimizes for watch time) to the user (who can optimize for digital well-being).

## 3. Limitations & Challenges

A system of this scale faces significant hurdles:

### Technical Detection

- **Text vs. Media**: Identifying patterns from text (titles, scripts) using `regex_triggers` is a feasible first step. However, many hooks (`pattern_interrupt`) and themes (`brainrot`) are purely audio-visual.
- **Client-Side Burden**: True detection would require sophisticated, on-device NLP and video/audio analysis (ML models). This is computationally expensive and complex to deploy in a simple browser extension.

### Subjectivity & Nuance

- One person's "addictive" theme is another's "relaxation." `asmr` and `restoration_cleaning` are prime examples. The system must be a highly personalized tool, not a universal censor.
- **Intent**: A video essay (`deep_dive_explainer`) about a harmful conspiracy theory is very different from one about film history. The taxonomy identifies the format, but not the intent or veracity of the information within it.

### The "Arms Race"

As soon as patterns are identified and filtered, creators and platforms will evolve new, more subtle patterns to bypass detection. This system would require constant maintenance and taxonomy updates, likely fueled by a crowdsourced community.

### Platform & Data Access

This system requires deep access to a user's content feed, which platforms actively obstruct. An "Accessibility extension" is a clever workaround, but it's fragile and prone to breaking with every app update. A browser extension is more stable but limited to web apps.

## 4. Way Forward: A Phased Implementation

This project can be rolled out in three phases, aligning with the proposed components:

### Phase 1: Creator-Side Tools & Crowdsourcing

Begin by building a "script linter" for content creators. This tool would use the taxonomies to analyze their scripts (`regex_triggers`) and warn them: "This script relies heavily on 'Outrage' hooks. This may lead to high engagement but a negative community."

Simultaneously, launch a simple "Report" tool (e.g., a browser extension) that allows engaged users to manually tag content they see with the taxonomy labels. This builds the critical dataset needed for Phase 2.

### Phase 2: Client-Side Moderation (The Extensions)

Using the dataset from Phase 1, train lightweight ML models to run in the browser and accessibility extensions.

The extension's UI would be key. Instead of just blocking, it could:

- **Label**: Display a small icon next to a video: 😡 (Provocation), ✨ (Aesthetic), 🧠 (Brainrot).
- **Warn**: "This is the 5th 'Us vs. Them' video you've seen in a row."
- **Filter**: Allow users to set their "cognitive diet" (e.g., "No 'Brainrot' after 9 PM," "Limit 'Interpersonal Drama' to 10 minutes per day").

### Phase 3: Platform Adoption (Voluntary & Mandated)

- **Voluntary**: Pitch this open-source taxonomy and toolset to pioneering social networks (e.g., BeReal, Mastodon, or a new ethical-first platform) as a built-in "Digital Well-being" feature.
- **Mandatory**: Advocate for this system as a legal standard. This is the end-game: legally mandated adoption. This could be framed as a public health initiative, similar to nutritional labeling on food. Platforms would be required to self-classify content using this (or a similar) open standard and provide an API for users to filter by it.

## 5. Application to Other Areas

The principles of "hook" and "loop" analysis are universal in media. This taxonomy can be directly applied to:

### Advertising

This is the most direct application. Ads are almost entirely composed of hooks (`knowledge_gap`, `problem_solution`, `us_vs_them`). A filter could identify and block ads based on the psychological tactic they use, not just their presence.

### Movies & Streaming (Trailers & UI)

- **Trailers**: Are 2-minute supercuts of hooks. The taxonomy can be used to deconstruct trailer effectiveness.
- **Streaming UI**: The "addictive" nature of Netflix or YouTube is in their interface. Autoplaying trailers (`pattern_interrupt`), "Top 10" lists (`social_proof`), and percentage-match scores (`relatability`) are all mechanisms that could be identified and moderated.

### News Media (Headlines)

"Clickbait" is just another name for a `knowledge_gap` or `provocation_controversy` hook. An extension could analyze news-site headlines and flag or rewrite them to be more neutral (e.g., "FLAGGED: Outrage Hook. Original: 'Senator SLAMS Rival...'").

### Gaming

The "Cognitively Addictive Themes" map directly to game design "compulsion loops." `process_and_completion` is the core of farming/crafting games. `novelty_and_unboxing` is the "loot box" mechanic. This framework could be used to analyze and rate games for their addictive potential.

## Key Components

A system to be able to understand social media patterns and themes, and to selectively block them. Acknowledge the cognitive mechanisms used to keep us addicted, in context.

### Implementation Targets

1. **Browser extension** that is able to plug above social networks
2. **Accessibility extension** for Android/iOS able to plug on social network apps, or social networks in browsers
3. **Volunteer adoption** by pioneering social networks
4. **Eventually legally mandated adoption** by social networks

## Technical Adoption Notes

This structure is designed for technical adoption, such as integration into a content management system, a script analysis tool, or a creative assistant application.

### Data Structure Fields

- **id** (string): A unique, stable identifier for programmatic use (e.g., mapping to a database key).
- **category_id** (string): Links the hook/theme to its parent category.
- **regex_triggers** (array of strings): These are not intended for high-accuracy detection in finished content (which requires complex NLP and/or video analysis). Instead, they are designed to be run against a user's draft script (e.g., in a text editor) to suggest which hook category they might be using. They are case-insensitive (/i).
- **warnings** (array of strings): These are content strategy risks. They can be surfaced to the user as tooltips or linting warnings to help them make better creative decisions.
- **icon_path** (string): A placeholder path for a frontend UI to visually represent the hook.
- **notes_for_devs** (string, optional): Provides extra context for implementation, especially where regex is insufficient.

## Taxonomies

The framework includes two comprehensive taxonomies in JSON format:

1. **[Social Media Hooks Taxonomy](taxonomies/social-media-hooks.json)** - Categorizes the 1-3 second "snare" techniques used to capture attention
2. **[Cognitively Addictive Themes Taxonomy](taxonomies/cognitively-addictive-themes.json)** - Categorizes content genres that create sustained engagement and "binge-watching" behavior

## Contributing

This framework is designed to be a living document. As social media evolves and new patterns emerge, the taxonomies will need to be updated. Contributions are welcome to:

- Add new hooks and themes
- Improve regex patterns
- Update warnings based on new research
- Expand to new platforms and media types

## License

This framework and taxonomies are provided under the same license as this repository (Apache License 2.0) to encourage adoption and modification by researchers, developers, and platforms.

## References

- [Social Media Hooks Documentation](https://docs.google.com/document/d/1bhNqJzc_Wlw95yGEMzmHTQK8b8mS_4mP-YZt9IYOfB4/edit?tab=t.0)
- [Cognitively Addictive Themes Documentation](https://docs.google.com/document/d/1bhNqJzc_Wlw95yGEMzmHTQK8b8mS_4mP-YZt9IYOfB4/edit?tab=t.h0v52m6i5ugt)
- [Moderation System Proposal](https://docs.google.com/document/d/1bhNqJzc_Wlw95yGEMzmHTQK8b8mS_4mP-YZt9IYOfB4/edit?tab=t.w3z2ncohr18d)
- [Regulatory Recommendations](https://docs.google.com/document/d/1bhNqJzc_Wlw95yGEMzmHTQK8b8mS_4mP-YZt9IYOfB4/edit?tab=t.86uxqyjzjvks)
