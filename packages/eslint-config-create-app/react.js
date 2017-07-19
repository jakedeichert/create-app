const WARN = 'warn';
const ERROR = 'error';

module.exports = {
  plugins: [
    'jsx-a11y', // https://github.com/evcohen/eslint-plugin-jsx-a11y
    'react', // https://github.com/yannickcr/eslint-plugin-react
  ],

  settings: {
    react: {
      pragma: 'React',
      version: '15.0',
    },
  },

  extends: 'plugin:react/recommended',

  rules: {
    // **********************************************************
    // Override react recommended defaults
    // **********************************************************
    // Prevent duplicate props in JSX
    'react/jsx-no-duplicate-props': [WARN, { ignoreCase: true }],
    // Ignore checking for the children prop type
    'react/prop-types': [WARN, { ignore: ['children'] }],

    // **********************************************************
    // Enable more react rules
    // **********************************************************
    // Prevent className and style props on components
    'react/forbid-component-props': WARN,
    // Prevent prop type "any"
    'react/forbid-prop-types': [WARN, { forbid: ['any'] }],
    // Prevent multiple component definitions per file
    'react/no-multi-comp': [WARN, { ignoreStateless: true }],
    // Prevent usage of the return value of React.render
    'react/no-render-return-value': WARN,
    // Prevent definitions of unused prop types
    'react/no-unused-prop-types': WARN,
    // Enforce ES6 class for React Components
    'react/prefer-es6-class': ERROR,
    // Enforce stateless React Components to be written as a pure function
    'react/prefer-stateless-function': WARN,
    // Prevent extra closing tags for components without children
    'react/self-closing-comp': WARN,
    // Enforce style prop value being an object
    'react/style-prop-object': WARN,
    // Enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': [WARN, 'never'],
    // Restrict file extensions that may contain JSX
    'react/jsx-filename-extension': [ERROR, { extensions: ['.js'] }],
    // Prevent usage of .bind() and arrow functions in JSX props
    'react/jsx-no-bind': WARN,
    // Enforce PascalCase for user-defined JSX components
    'react/jsx-pascal-case': WARN,

    // **********************************************************
    // Enable jsx-a11y rules
    // **********************************************************
    // Enforce all elements that require alternative text https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/alt-text.md
    'jsx-a11y/alt-text': WARN,
    // Enforce all anchors to contain accessible content
    'jsx-a11y/anchor-has-content': WARN,
    // Enforce all aria-* props are valid
    'jsx-a11y/aria-props': WARN,
    // Enforce ARIA state and property values are valid
    'jsx-a11y/aria-proptypes': WARN,
    // Enforce that elements with ARIA roles must use a valid, non-abstract ARIA role
    'jsx-a11y/aria-role': WARN,
    // Enforce that elements that do not support ARIA roles, states, and properties do not have those attributes
    'jsx-a11y/aria-unsupported-elements': WARN,
    // Enforce a clickable non-interactive element has at least one keyboard event listener
    'jsx-a11y/click-events-have-key-events': WARN,
    // Enforce heading elements contain accessible content
    'jsx-a11y/heading-has-content': WARN,
    // Enforce all anchors are valid, navigable elements https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': WARN,
    // Enforce <html> element has lang prop
    'jsx-a11y/html-has-lang': WARN,
    // Enforce <img> alt prop does not contain the word "image", "picture", or "photo"
    'jsx-a11y/img-redundant-alt': WARN,
    // Enforce that elements with interactive handlers like onClick must be focusable https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/interactive-supports-focus.md
    'jsx-a11y/interactive-supports-focus': WARN,
    // Enforce that <label> elements have the htmlFor prop
    'jsx-a11y/label-has-for': WARN,
    // Enforce lang attribute has a valid value
    'jsx-a11y/lang': WARN,
    // Enforce that the accessKey prop is not used on any element to avoid complications with keyboard commands used by a screenreader
    'jsx-a11y/no-access-key': WARN,
    // Enforce <marquee> and <blink> elements are not used
    'jsx-a11y/no-distracting-elements': WARN,
    // Non-interactive elements should not be assigned mouse or keyboard event listeners https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md
    'jsx-a11y/no-noninteractive-element-interactions': WARN,
    // Non-interactive elements should not be assigned interactive roles https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-element-to-interactive-role.md
    'jsx-a11y/no-noninteractive-element-to-interactive-role': WARN,
    // tabIndex should only be declared on interactive elements https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-noninteractive-tabindex.md
    'jsx-a11y/no-noninteractive-tabindex': WARN,
    // Enforce usage of onBlur over onChange on select menus for accessibility
    'jsx-a11y/no-onchange': WARN,
    // Enforce explicit role property is not the same as implicit/default role property on element
    'jsx-a11y/no-redundant-roles': WARN,
    // Enforce that non-interactive elements that have click handlers use the role attribute https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/master/docs/rules/no-static-element-interactions.md
    'jsx-a11y/no-static-element-interactions': WARN,
    // Enforce that elements with ARIA roles must have all required attributes for that role
    'jsx-a11y/role-has-required-aria-props': WARN,
    // Enforce that elements with explicit or implicit roles defined contain only aria-* properties supported by that role
    'jsx-a11y/role-supports-aria-props': WARN,
    // Enforce scope prop is only used on <th> elements
    'jsx-a11y/scope': WARN,
    // Enforce tabIndex value is not greater than zero
    'jsx-a11y/tabindex-no-positive': WARN,
  },
};
