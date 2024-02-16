"use strict";(self.webpackChunk_teamhanko_docs=self.webpackChunk_teamhanko_docs||[]).push([[929],{2403:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>m,default:()=>y,frontMatter:()=>d,metadata:()=>h,toc:()=>k});var a=n(7462),o=n(7294),i=n(3905),r=n(814);function s(e){const t=e.split("/").pop();return t.slice((Math.max(0,t.lastIndexOf("."))||1/0)+1)}function l(e){return e.replace("https://github.com/","").split("/").slice(4,1/0).join("/")}const p=e=>{let{url:t,loadingComponent:n,errorComponent:a,onLoad:i,onError:p}=e;const[u,d]=o.useState(""),[m,h]=o.useState(!0),[c,k]=o.useState(!1);if(!t.match(/^https:\/\/github\.com\/.*\/.*\/blob\/.*/))throw new Error("Invalid URL format");return o.useEffect((()=>{d(""),h(!0),k(!1);const e=function(e){const[t,n,a,o,...i]=e.replace("https://github.com/","").split("/");return`https://raw.githubusercontent.com/${t}/${n}/${o}/${i.join("/")}`}(t);(async()=>{try{const t=await fetch(e,{headers:{"Content-Type":"text/plain; charset=utf-8"}});if(t.ok){const e=await t.text();d(e),h(!1),i()}else k(!0),p(new Error)}catch(t){k(!0),p(t)}})()}),[t,i,p]),c?a:m?n:o.createElement(r.Z,{language:s(t),title:l(t)},u)};p.defaultProps={loadingComponent:o.createElement("p",null,"loading..."),errorComponent:o.createElement("p",null,"an error occured."),onLoad:()=>{},onError:e=>console.log(e)};const u=p,d={title:"Symfony + Hanko",sidebar_label:"Symfony",keywords:["php","symfony"]},m="Using Hanko with the Symfony Framework",h={unversionedId:"guides/tutorials/php",id:"guides/tutorials/php",title:"Symfony + Hanko",description:"In this guide we are going to explain how to use Hanko with the Symfony framework for PHP. As Symfony is a full-stack framework with many abstractions for authentication management already present, we try to integrate Hanko as seamlessly as possible.",source:"@site/docs/guides/tutorials/php.mdx",sourceDirName:"guides/tutorials",slug:"/guides/tutorials/php",permalink:"/guides/tutorials/php",draft:!1,tags:[],version:"current",frontMatter:{title:"Symfony + Hanko",sidebar_label:"Symfony",keywords:["php","symfony"]},sidebar:"docs",previous:{title:"SAML SSO",permalink:"/guides/ee/saml"},next:{title:"Next.js",permalink:"/guides/tutorials/nextjs"}},c={},k=[{value:"Prerequisites",id:"prerequisites",level:2},{value:"Creating and running the Symfony application",id:"creating-and-running-the-symfony-application",level:2},{value:"Integrating Hanko Frontend Components",id:"integrating-hanko-frontend-components",level:2},{value:"Checking Hanko API tokens and providing a way to setup user account data during registration of a new account",id:"checking-hanko-api-tokens-and-providing-a-way-to-setup-user-account-data-during-registration-of-a-new-account",level:2},{value:"Modifying the User entity and removing passwords from the application",id:"modifying-the-user-entity-and-removing-passwords-from-the-application",level:2},{value:"Making logout work",id:"making-logout-work",level:2}],g={toc:k};function y(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,a.Z)({},g,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"using-hanko-with-the-symfony-framework"},"Using Hanko with the Symfony Framework"),(0,i.kt)("p",null,"In this guide we are going to explain how to use Hanko with the Symfony framework for PHP. As Symfony is a full-stack framework with many abstractions for authentication management already present, we try to integrate Hanko as seamlessly as possible."),(0,i.kt)("h2",{id:"prerequisites"},"Prerequisites"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"PHP 8.1 installed and usable as cli command ",(0,i.kt)("inlineCode",{parentName:"li"},"php")),(0,i.kt)("li",{parentName:"ul"},"NodeJS 8.1 with NPM 9.5 installed and usable with default commands ",(0,i.kt)("inlineCode",{parentName:"li"},"npm")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"node")),(0,i.kt)("li",{parentName:"ul"},"Symfony CLI installed and usable with the default ",(0,i.kt)("inlineCode",{parentName:"li"},"symfony")," command. For instructions refer to the ",(0,i.kt)("a",{parentName:"li",href:"https://symfony.com/download"},"Symfony Docs"))),(0,i.kt)("h2",{id:"creating-and-running-the-symfony-application"},"Creating and running the Symfony application"),(0,i.kt)("p",null,"Use the following command to create a new symfony application from the Symfony demo template. ",(0,i.kt)("inlineCode",{parentName:"p"},"<demo-app-name>")," is a placeholder for the name of the application (and directory in which it will be located). You can freely choose a ",(0,i.kt)("inlineCode",{parentName:"p"},"<demo-app-name>")," that suits your needs and even describes your application best."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"symfony new --demo <demo-app-name>\n")),(0,i.kt)("p",null,"All following commands need to be run in the project directory so we move to this directory:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"cd <demo-app-name>\n")),(0,i.kt)("p",null,"To be able to work on the frontend parts of the project, we need to install all of its JavaScript dependencies first.\nAs usual we use NPM for this job."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install\n")),(0,i.kt)("p",null,"We can now start the Symfony development server integrated in the Symfony CLI which serves your application on a local port."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"symfony serve\n")),(0,i.kt)("p",null,"You can now access your demo application using the link in the commands output."),(0,i.kt)("h2",{id:"integrating-hanko-frontend-components"},"Integrating Hanko Frontend Components"),(0,i.kt)("p",null,"To integrate the frontend components, we need to install the ",(0,i.kt)("inlineCode",{parentName:"p"},"@teamhanko/hanko-elements")," package using NPM."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-bash"},"npm install @teamhanko/hanko-elements --save-dev\n")),(0,i.kt)("p",null,"Using ",(0,i.kt)("inlineCode",{parentName:"p"},"--save-dev")," installs the package to the ",(0,i.kt)("inlineCode",{parentName:"p"},"devDependwncies")," part of ",(0,i.kt)("inlineCode",{parentName:"p"},"package.json")," which is what we want as a Symfony project doesn't have any runtime JavaScript and thus no runtime dependencies."),(0,i.kt)("p",null,"As we need to set the Hanko API URL somewhere and pass it to the frontend components and backend token validation logic, we create a new entry in the projects ",(0,i.kt)("inlineCode",{parentName:"p"},".env")," file called ",(0,i.kt)("inlineCode",{parentName:"p"},"HANKO_API_URL"),". E.g. like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"HANKO_API_URL=https://<id>.hanko.io\n")),(0,i.kt)("p",null,"The placeholder ",(0,i.kt)("inlineCode",{parentName:"p"},"<id>")," would be your Hanko cloud instance ID. If you don't use Hanko cloud, the complete ",(0,i.kt)("inlineCode",{parentName:"p"},"HANKO_API_URL")," is just the URL the Hanko server you want to use. To deploy yourself a Hanko server instance, refer to the ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/teamhanko/hanko"},"README")," of the hanko GitHub project."),(0,i.kt)("p",null,"As we need to access the value of our new environment variable ",(0,i.kt)("inlineCode",{parentName:"p"},"HANKO_API_URL")," somehow inside Twig templates, we chose to create a Twig-Extension:"),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/Twig/HankoExtension.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"As you can see, there is a ",(0,i.kt)("inlineCode",{parentName:"p"},"string $hankoApiUrl"),' parameter in the constructor function of this class. As Symfony auto-discovers  TwigExtensions and tags them correctly, our class is going to be loaded and injected into the Twig environment right away.\nWithout "telling" the Symfony DI Container about the value for the ',(0,i.kt)("inlineCode",{parentName:"p"},"$hankoApiUrl")," parameter, Symfony won't be able to instantiate our class. For service creation to work, we need to manually configure a service argument in ",(0,i.kt)("inlineCode",{parentName:"p"},"config/services.yaml "),"."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"App\\Twig\\HankoExtension:\n    arguments:\n        $hankoApiUrl: '%env(HANKO_API_URL)%'\n")),(0,i.kt)("p",null,"As the Symfony Demo Application uses Stimulus controllers with the Symfony UX stimulus-bridge for the original authentication forms, we adapt the ",(0,i.kt)("inlineCode",{parentName:"p"},"assets/controllers/login-controller.js")," to load the ",(0,i.kt)("inlineCode",{parentName:"p"},"hanko-auth")," custom element."),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/assets/controllers/login-controller.js",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"As you can see, the adapted ",(0,i.kt)("inlineCode",{parentName:"p"},"login-controller")," defines the stimulus values ",(0,i.kt)("inlineCode",{parentName:"p"},"hankoApiUrl")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"loginPath"),"."),(0,i.kt)("p",null,"Those values are provided in the ",(0,i.kt)("inlineCode",{parentName:"p"},"templates/security/login.html.twig")," using the ",(0,i.kt)("inlineCode",{parentName:"p"},"stimulus_controller")," Twig function."),(0,i.kt)("p",null,"There is also a stimulus target defined in the component and marked by the ",(0,i.kt)("inlineCode",{parentName:"p"},"stimulus_target")," Twig helper function."),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/templates/security/login.html.twig",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"The most important part of this template is the following:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-twig"},"<div class=\"row\" {{ stimulus_controller('login', {\n    'hankoApiUrl': hanko_api_url(),\n    'loginPath': path('security_login')\n}) }}>\n    <div class=\"col-sm-8\">\n        <div class=\"well\">\n            <h2><i class=\"fa fa-lock\" aria-hidden=\"true\"></i> {{ 'title.login'|trans }}</h2>\n            <hanko-auth {{ stimulus_target('login', 'hankoAuth') }}></hanko-auth>\n        </div>\n    </div>\n</div>\n")),(0,i.kt)("p",null,"From now on, a user can use the ",(0,i.kt)("inlineCode",{parentName:"p"},"<hanko-auth>")," element to create an account or log themselves in using Hanko. Just the Symfony backend won't be able to determine that the user has logged in with hanko. So we need some backend parts."),(0,i.kt)("h2",{id:"checking-hanko-api-tokens-and-providing-a-way-to-setup-user-account-data-during-registration-of-a-new-account"},"Checking Hanko API tokens and providing a way to setup user account data during registration of a new account"),(0,i.kt)("p",null,"Leveraging the power of the Symfony Security component, we can authenticate the user with a ",(0,i.kt)("a",{parentName:"p",href:"https://symfony.com/doc/current/security/custom_authenticator.html"},"custom Authenticator"),"."),(0,i.kt)("p",null,"The custom Authenticator for this example looks like this:"),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/Security/HankoLoginAuthenticator.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"And has a dependency on three Composer packages which you need to install like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"composer require lcobucci/clock strobotti/php-jwk lcobucci/jwt\n")),(0,i.kt)("p",null,"Composer automatically adds those packages to the projects ",(0,i.kt)("inlineCode",{parentName:"p"},"composer.json"),". The versions we used are:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'"lcobucci/clock": "^3.0",\n"lcobucci/jwt": "^5.0",\n"strobotti/php-jwk": "^1.4",\n')),(0,i.kt)("p",null,"As the Authenticator needs the ",(0,i.kt)("inlineCode",{parentName:"p"},"$hankoApiUrl")," as a constructor parameter, adding this as an argument to the Symfony Service in ",(0,i.kt)("inlineCode",{parentName:"p"},"services.yaml")," like we already did with the ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoExtension")," above, is required:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"App\\Security\\HankoLoginAuthenticator:\n    arguments:\n        $hankoApiUrl: '%env(HANKO_API_URL)%'\n")),(0,i.kt)("p",null,"For the Authenticator to be called by the framework during user authentication, it has to be configured in the ",(0,i.kt)("inlineCode",{parentName:"p"},"config/packages/security.yaml")," as follows:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"firewalls:\n    dev:\n        pattern: ^/(_(profiler|wdt)|css|images|js)/\n        security: false\n\n    main:\n        # this firewall does not have a 'pattern' option because it applies to all URLs\n        lazy: true\n        stateless: true\n        provider: all_users\n        logout:\n            path: security_logout\n        custom_authenticators:\n            - App\\Security\\HankoLoginAuthenticator\n\n        entry_point: App\\Security\\HankoAuthenticationEntryPoint\n")),(0,i.kt)("p",null,"You can find the full ",(0,i.kt)("inlineCode",{parentName:"p"},"security.yaml")," ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/teamhanko/symfony-example/blob/main/config/packages/security.yaml"},"here"),"."),(0,i.kt)("p",null,"Contrary to the default, the ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," firewall has the configuration attribute ",(0,i.kt)("inlineCode",{parentName:"p"},"stateless: true")," which indicates to the Symfony Security component: don't save the resulting authentication state to a cookie and read this cookie the next time a user wants to do something but run the Authenticator on every request and thus validate the ",(0,i.kt)("inlineCode",{parentName:"p"},"Hanko")," cookie (containing a JWT signed by Hanko) on each request."),(0,i.kt)("p",null,"As you can already see, we also defined a new ",(0,i.kt)("inlineCode",{parentName:"p"},"entry_point")," for the ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," firewall. To understand why we need a custom ",(0,i.kt)("inlineCode",{parentName:"p"},"entry_point")," we first need to understand how the custom Authenticator, we created before, works."),(0,i.kt)("p",null,"As mentioned before, the Authenticator looks for a ",(0,i.kt)("inlineCode",{parentName:"p"},"Hanko")," cookie inside each request and validates the contained JWT against two rules:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"Is the JWT still valid right now (checking the ",(0,i.kt)("inlineCode",{parentName:"li"},"exp")," and ",(0,i.kt)("inlineCode",{parentName:"li"},"iat")," token claims)?"),(0,i.kt)("li",{parentName:"ul"},"Was the JWT signed by the given Hanko instance?")),(0,i.kt)("p",null,"To validate the signature of the JWT, the Authenticator needs to load the JWKS from the corresponding Hanko endpoint, match keys and check the signature."),(0,i.kt)("p",null,"When all of this is done and the token is valid, we extract the ",(0,i.kt)("inlineCode",{parentName:"p"},"sub")," claim of the JWT token (containing the Hanko user id) and build a Symfony Security ",(0,i.kt)("inlineCode",{parentName:"p"},"Passport")," which is then given to a ",(0,i.kt)("inlineCode",{parentName:"p"},"ChainUserProvider")," called ",(0,i.kt)("inlineCode",{parentName:"p"},"all_users")," as given in the security config here:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-yaml"},"providers:\n    database_users:\n        entity: { class: App\\Entity\\User, property: hankoSubjectId }\n\n    hanko_users:\n        id: App\\Security\\HankoUserProvider\n\n    all_users:\n        chain:\n            providers: ['database_users', 'hanko_users']\n")),(0,i.kt)("p",null,"A ",(0,i.kt)("inlineCode",{parentName:"p"},"ChainUserProvider")," calls the configured child UserProviders in the given order (first ",(0,i.kt)("inlineCode",{parentName:"p"},"database_users"),", then ",(0,i.kt)("inlineCode",{parentName:"p"},"hanko_users"),") to load a user object."),(0,i.kt)("p",null,"As the ",(0,i.kt)("inlineCode",{parentName:"p"},"database_users")," provider cannot provide a user when the user registers for the first time, the ",(0,i.kt)("inlineCode",{parentName:"p"},"hanko_users")," provider gets called."),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"hanko_users")," provider has a custom service called ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoUserProvider")," associated to it, looking like this:"),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/Security/HankoUserProvider.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"It creates a new ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoUser")," object using the given ",(0,i.kt)("inlineCode",{parentName:"p"},"$identifier")," previously set from the JWTs ",(0,i.kt)("inlineCode",{parentName:"p"},"sub")," claim in the ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoUserProvider"),"."),(0,i.kt)("p",null,"When those steps are done, there is either a ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoUser")," or a normal ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," object set in the Symfony Security module. Depending on which type of User is currently authenticated, we can decide to just show a registration form and don't allow the user to go further using a custom ",(0,i.kt)("inlineCode",{parentName:"p"},"entry_point")," in the ",(0,i.kt)("inlineCode",{parentName:"p"},"main")," firewall part of the ",(0,i.kt)("inlineCode",{parentName:"p"},"security.yaml")," configuration."),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/Security/HankoAuthenticationEntryPoint.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"Additionally we need to create a new ",(0,i.kt)("inlineCode",{parentName:"p"},"EventSubscriber")," listening on all ",(0,i.kt)("inlineCode",{parentName:"p"},"KernelEvents::REQUEST")," events to redirect users from every other URL than the registration URL back there."),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/EventSubscriber/UpgradeHankoUserSubscriber.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("p",null,"For the purpose of registering a new user, a new Controller method called ",(0,i.kt)("inlineCode",{parentName:"p"},"register")," placed in the ",(0,i.kt)("inlineCode",{parentName:"p"},"SecurityController")," of the Demo project is required looking like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-php"},"#[Route('/register', name: 'security_register', methods: ['GET', 'POST'])]\npublic function register(\n    #[CurrentUser] ?UserInterface $user,\n    Request $request,\n    EntityManagerInterface $entityManager,\n    UserRepository $userRepository\n): Response {\n    // if user is not a HankoUser or does not exist, don't display the register page\n    // as only HankoUsers can be registered\n    if (!$user instanceof HankoUser) {\n        return $this->redirectToRoute('blog_index');\n    }\n\n    $this->saveTargetPath($request->getSession(), 'main', $this->generateUrl('admin_index'));\n\n    $requestData = $request->request->all();\n    if (isset($requestData['user']['email'])) {\n        $databaseUser = $userRepository->findOneByEmail($requestData['user']['email']);\n    }\n\n    if (!isset($databaseUser)) {\n        $databaseUser = new User();\n    }\n\n    $databaseUser->setHankoSubjectId($user->getUserIdentifier());\n    $userForm = $this->createForm(UserType::class, $databaseUser);\n\n    $userForm->handleRequest($request);\n\n    if ($userForm->isSubmitted() && $userForm->isValid()) {\n        $userEmail = $databaseUser->getEmail();\n        \\assert(!empty($userEmail), 'User email should not be empty');\n        $databaseUser->setUsername($userEmail);\n\n        $entityManager->persist($databaseUser);\n        $entityManager->flush();\n\n        return $this->redirectToRoute('blog_index');\n    }\n\n    return $this->render('security/register.html.twig', [\n        'userForm' => $userForm,\n    ]);\n}\n")),(0,i.kt)("p",null,"As one can see, we utilize the Symfony Forms component to create a form based on a ",(0,i.kt)("inlineCode",{parentName:"p"},"UserType")," containing all the form fields."),(0,i.kt)("p",null,"Symfony Forms will render and validate the form so a new databases based ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," can be created based of the users input."),(0,i.kt)("p",null,"The Twig template for the new registration controller looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-html"},'<div class="row" {{ stimulus_controller(\'register\', {\n    \'hankoApiUrl\': hanko_api_url()\n}) }}>\n    <div class="col-sm-5">\n        <div class="jumbotron">\n            {{ form_start(userForm) }}\n                {{ form_widget(userForm) }}\n\n                <button type="submit" class="btn btn-primary">\n                    <i class="fa fa-save" aria-hidden="true"></i> {{ \'action.save\'|trans }}\n                </button>\n            {{ form_end(userForm) }}\n        </div>\n    </div>\n</div>\n')),(0,i.kt)("p",null,"Here we can also use our previously created Twig function ",(0,i.kt)("inlineCode",{parentName:"p"},"hanko_api_url")," from the ",(0,i.kt)("inlineCode",{parentName:"p"},"HankoTwigExtension")," to pass through the Hanko API URL to our frontend code."),(0,i.kt)("p",null,"Utilizing another Stimulus Controller for pre-filling the email field with the users email previously typed into the Hanko registration form."),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-js"},"export default class extends Controller {\n  static targets = ['fullName', 'email', 'username']\n  static values = {\n    hankoApiUrl: String\n  }\n\n  async connect() {\n    let { hanko } = await register(this.hankoApiUrlValue);\n    let user = await hanko.user.getCurrent();\n    let userEmail = user.email;\n\n    this.usernameTarget.value = userEmail;\n    this.emailTarget.value = userEmail;\n  }\n}\n")),(0,i.kt)("p",null,"The Stimulus targets used by the controller displayed above aren't set using the ",(0,i.kt)("inlineCode",{parentName:"p"},"stimulus_"),"-Twig helper functions but provided in the ",(0,i.kt)("inlineCode",{parentName:"p"},"UserType")," Form-Type."),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/Form/UserType.php",mdxType:"EmbedGitHubFileContent"}),(0,i.kt)("h2",{id:"modifying-the-user-entity-and-removing-passwords-from-the-application"},"Modifying the User entity and removing passwords from the application"),(0,i.kt)("p",null,"As the default ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," in our Demo Application still uses passwords, we need to remove everything about those. Most importantly, we need to modify the ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," entity and the corresponding database table.\nFirst, we remove the ",(0,i.kt)("inlineCode",{parentName:"p"},"PasswordAuthenticatedUserInterface")," from the ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," and als its corresponding methods like:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getPassword")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"setPassword")),(0,i.kt)("li",{parentName:"ul"},(0,i.kt)("inlineCode",{parentName:"li"},"getSalt"))),(0,i.kt)("p",null,"While we're at it, adding a field called ",(0,i.kt)("inlineCode",{parentName:"p"},"hankoSubjectId")," referencing the Hanko User ID can be added to the entity and also the database table using a migration which can be created after modifying the ",(0,i.kt)("inlineCode",{parentName:"p"},"User")," entity by running the following command:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"php bin/console doctrine:migrations:diff\n")),(0,i.kt)("p",null,"On the same account, the controller method ",(0,i.kt)("inlineCode",{parentName:"p"},"UserController::changePassword")," can obviously get removed too."),(0,i.kt)("h2",{id:"making-logout-work"},"Making logout work"),(0,i.kt)("p",null,"We also need to do some manual steps to allow users to log out of their account again. Usually the Symfony Security component automatically handles this scenario by resetting the users session. As we don't use the session based authentication system but read authentication data from the ",(0,i.kt)("inlineCode",{parentName:"p"},"Hanko")," cookie, this cookie needs to be deleted from the users browser to log them out."),(0,i.kt)("p",null,"For this, another ",(0,i.kt)("inlineCode",{parentName:"p"},"EventSUbscriber")," is required:"),(0,i.kt)(u,{url:"https://github.com/teamhanko/symfony-example/blob/main/src/EventSubscriber/LogoutHankoUserSubscriber.php",mdxType:"EmbedGitHubFileContent"}))}y.isMDXComponent=!0}}]);