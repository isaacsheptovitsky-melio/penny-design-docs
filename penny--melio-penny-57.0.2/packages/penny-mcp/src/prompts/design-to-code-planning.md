# Design-to-Code Planning Guide

{{CONTEXT}}

## Overview

This guide helps you plan the design-to-code implementation before writing code. It covers component discovery, analysis, and creating an implementation plan that uses Penny components correctly.

## Core Technology Constraints

- **Design system:** `@melio/penny` (single source of truth)
- **Figma tooling:** Figma MCP integrations for extracting component metadata and assets
- **Penny tooling:** Penny MCP integrations for discovering available components and design tokens, and understanding component APIs

### Non-Negotiable Rules

- **Design System Priority:** **ALWAYS** use components from `@melio/penny` as building blocks
- **Token Usage:** **NEVER** use hex codes, pixel values for spacing, or individual font properties. Always use Penny's semantic tokens (`colors`, `spacing`, `textStyle`)
- **Chakra Exception:** The **ONLY** component permitted from `@chakra-ui/react` is `Box`, and only when `penny` does not provide an equivalent wrapper
- **Layout Rule:** For layout, **ONLY** use penny's layout components

## Step 1: Component Discovery & Analysis

### 1. Extract Figma Information (if Figma link provided)

- Use Figma MCP tools to get code and component mapping
- Identify component names used in design
- Get images for visual reference
- Extract design tokens (colors, spacing, typography)

### 2. Map Components

**Use Penny MCP tools** to discover all available components and design tokens in the Penny design system:

- **`list_penny_components`** - Discover all available Penny components. Use this to see what components are available in the design system.
- **`get_penny_component_details`** - Get component props, variants, and usage details. Use this to verify component APIs and understand how to use each component correctly.
- **`list_penny_design_tokens`** - Discover available design tokens (colors, spacing, typography, etc.). Use this to find the correct semantic tokens to use.

**After using the MCP tools:**

- Match Figma component names to `@melio/penny` components
- Document any custom components needed
- Identify layout patterns using penny layout components
- Match exact spacing, colors, and typography to `@melio/penny` design tokens

### 3. Component Inventory

Create a complete inventory:

- List all penny components needed
- Note any missing components that need custom implementation
- Document component variants/props required
- Specify exact design token values (colors, spacing, fonts)

## Step 2: Planning & Verification

Before writing code, share an implementation plan for approval using the following format:

### 1. Component Breakdown

List all penny components to be used with their specific purposes:

- Include component variants and key props
- Note any custom components needed
- Specify exact penny component names and imports

**Example:**

```
## Penny Components to be used:
- Container (from @melio/penny) - Main layout wrapper
- Group (from @melio/penny) - Vertical/horizontal grouping
- Text (from @melio/penny) - Typography components
- Form (from @melio/penny) - Form container with spacing
- FormField (from @melio/penny) - Form field wrapper
- TextField (from @melio/penny) - Text input fields
- Button (from @melio/penny) - Action buttons
```

### 2. Layout Structure

Present detailed component hierarchy using penny components:

- Show exact component nesting and relationships
- Specify penny component props (spacing, variants, etc.)
- Document responsive behavior and breakpoints
- Use clear indentation to show component hierarchy

**Example Structure:**

```
ComponentName/
├── Container (main wrapper)
├── Group (vertical layout)
│   ├── Group (content section)
│   │   ├── Text (heading) - "Title"
│   │   └── Form (form container)
│   │       ├── FormField (TextField)
│   │       └── FormField (TextField)
│   ├── Group (another section)
│   │   ├── Text (heading) - "Section Title"
│   │   └── Form (form container)
│   │       ├── FormField (TextField)
│   │       └── FormField (TextField)
│   └── Group (actions)
│       ├── Button (secondary) - "Cancel"
│       └── Button (primary) - "Submit"
```

### 3. Design Tokens

List the penny semantic tokens you plan to use:

- Colors: List semantic color tokens (e.g., `semantic.text.primary`, `semantic.border.static`)
- Spacing: List spacing tokens (e.g., `s`, `m`, `l`)
- Typography: List text styles (e.g., `heading1Semi`, `body2`)
- Flag any deviations from standard Penny tokens

### 4. Confirmation

Ask the reviewer to validate the proposed component selection, layout, and token plan before implementation begins:

- Wait for explicit user approval before proceeding to implementation
- Do not assume approval - wait for the user to confirm the plan

## Step 3: Implementation strategy

### 1. Focus on UI components

Implement a standalone UI component. Don't connect it to route or Backend endpoints. Your focus is composing the design system building blocks following the design.

### 2. Break into sub-components

Follow react principle: 

> use the same techniques for deciding if you should create a new function or object. One such technique is the separation of concerns, that is, a component should ideally only be concerned with one thing. If it ends up growing, it should be decomposed into smaller subcomponents.

### 3. Single Story implementation

Implement a single story that looks exactly like the design. The story should be functional for the user to play with.
Don't implement more stories with different states. Don't implement unit or integration tests. 

## Planning Checklist

Use this checklist to track your progress through the planning phase:

- [ ] Extracted Figma information using Figma MCP tools
- [ ] Used `list_penny_components` to discover available components
- [ ] Used `get_penny_component_details` to verify component APIs
- [ ] Used `list_penny_design_tokens` to discover available tokens
- [ ] Created component inventory
- [ ] Matched Figma components to Penny components
- [ ] Created planning document with component breakdown
- [ ] Created planning document with layout structure
- [ ] Created planning document with design tokens
- [ ] Presented planning document to user
- [ ] Received explicit user approval
- [ ] Ready to proceed to implementation phase

## Next Steps

After completing the planning phase and receiving user approval:

1. Proceed to implementation
2. Follow the approved component hierarchy and token assignments
3. Use Penny MCP tools during implementation to verify component APIs
4. Verify the code is valid and there is no type issues
5. Implement single story to compare and demonstrate the design

