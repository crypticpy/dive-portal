## ADDED Requirements

### Requirement: Event Detail Pages
The system SHALL provide a detail page for each cohort event under `cohorts/<year>/events/<event-id>/` using a dedicated `event` layout.

#### Scenario: Navigate from timeline
- WHEN a user clicks a timeline event on a cohort page
- THEN they navigate to `/cohorts/<year>/events/<event-id>/`

#### Scenario: Render event information
- WHEN an event page is opened
- THEN the page shows name, date, time (if provided), location (if provided), and description (if provided)

### Requirement: Event Attachments
Event detail pages SHALL support attachments defined either in page front matter or in the cohort data file for that event.

#### Scenario: Attachments from front matter
- GIVEN `attachments` is defined in the event page front matter
- WHEN the event page is opened
- THEN attachments are listed with titles and links

#### Scenario: Attachments from cohort data
- GIVEN `attachments` defined in `_data/cohorts/<year>.yml` for the event
- WHEN the event page is opened
- THEN attachments are listed with titles and links

### Requirement: Backward-Compatible Timeline
The timeline include SHALL continue rendering when event pages do not yet exist; links are derived from year + event id or slug.

#### Scenario: Missing event page
- GIVEN an event in the timeline without a corresponding page
- WHEN a user clicks the event
- THEN the link resolves to the expected path which can be created later

