# About the "custom-action" action
Amazon CodeCatalyst offers a faster planning, development, and delivery lifecycle where developers can quickly and easily develop applications on AWS. Software security is often set in the context of the code we write and libraries we use. As infrastructure as code (IaC) becomes more prevalent, projects are being driven by more Agile and DevOps software development lifecycles (SDLCs), introducing more software development workflows to software security.

In this Project, we will develop a custom Actions source code that can be used by Partners to publish it to CodeCatalyst, provided they are approved and allowlisted by CodeCatalyst team. Partners are still responsible for testing all use cases, making the necessary changes, and publishing the action.

The **custom-action** action can also be used by AWS Partners and Customers to build Action code for their offerings or projects. 


## Basic example
<!--
- Include a real-world example + an introduction explaining the example.    
- The example should show just the action YAML code, but...
- If the action relies on other actions, include the larger workflow YAML.  
- Example content follows. -->

The following example shows how to configure **custom-action-CI-workflow**.

> **Note**:  The example is for illustrative purposes, and will not work without additional configuration.


```
Name: custom-action-CI-workflow
SchemaVersion: 1.0
...
Actions:      
  custom-action:
    Identifier: apo/custom-action@v1
    Environment:
      Name: codecatalyst-environment
      Connections:
        - Name: codecatalyst-account-connection
          Role: codecatalyst-role
    Inputs:
      Sources:
        - WorkflowSource
    Configuration:
      AwsAccessKeyId : ${Secrets.AWS_ACCESS_KEY_ID}
      AwsSecretAccessKey : ${Secrets.AWS_SECRET_ACCESS_KEY
```
---

Configuration properties used in this example are described below.


### custom-action

The friendly name for the **custom-action** action, and is used as a label in logs when the action runs.

Required: Yes

Default: custom-action

---

### Identifier

Identifies the action.

Required: Yes

Default: apo/custom-action@v1

---

### Environment.Name

The name of an existing environment that you want to associate with the action.  For information about environments, see [Working with environments](https://docs.aws.amazon.com/codecatalyst/latest/userguide/deploy-environments.html) in the *Amazon CodeCatalyst User Guide*.

Required: No

Default: none

---

### Environment.Connections.Name

The name of the account connection. For information about account connections, see [Adding an AWS account to a space](https://docs.aws.amazon.com/codecatalyst/latest/userguide/ipa-connect-account-create.html) in the *Amazon CodeCatalyst User Guide*.

Required: Yes

Default: none

---

### Environment.Connections.Role

The name of the IAM role that the **custom-action** action uses to access AWS resources. Make sure that the role includes:


The following permissions policy:

> **Warning**: Limit the permissions to the minimum required for the action to run successfully. Using a role with broader permissions might pose a security risk.

> **Note**:  The example is for illustrative purposes, and will not work without additional configuration.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "cloudformation:DescribeStackEvents",
                "cloudformation:DescribeChangeSet",
                "cloudformation:DescribeStacks",
                "cloudformation:ListStackResources"
            ],
            "Resource": "*"
        },
        {
            "Sid": "VisualEditor1",
            "Effect": "Allow",
            "Action": "sts:AssumeRole",
            "Resource": "arn:aws:iam::aws-account:role/cdk-*"
        }
    ]
}
```
The following custom trust policy:
```
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "Service":  [
                       "codecatalyst-runner.amazonaws.com",
                       "codecatalyst.amazonaws.com"
                     ]
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }
```
Make sure that this role is added to your account connection.

For more information on creating IAM roles, see [Creating a role using a custom trust policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-custom.html) in the *AWS Identity and Access Management User Guide*.

---

### Inputs.Sources


If the action needs access to files stored in a source repository, specify the label of that source repository. Currently, the only supported label is `WorkflowSource`.

Required: Yes, if the action needs access to files stored in a source repository.

Default: WorkFlowSource

---

### Configuration.AwsAccessKeyId

AWS Access key ID value from your [AWS IAM Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html)

Required: No

Default: ${Secrets.AWS_ACCESS_KEY_ID}

---

### Configuration.AwsSecretAccessKey

AWS Secret Access Key value from your [AWS IAM Credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/security-creds.html)

Required: No

Default: ${Secrets.AWS_SECRET_ACCESS_KEY}

---

## How the "custom-action" action works
<!-- An optional section where you can describe behind-the-scenes processing, or extra details. 
Example content follows. -->

The **custom-action** action works as follows:

- At runtime, the action logs a greeting line composed of a configured name and message.

## Troubleshooting
<!-- An optional section where you can provide a link to troubleshooting information. 
Example content follows. -->
For troubleshooting information, see [Troubleshooting problems with workflows](https://docs.aws.amazon.com/codecatalyst/latest/userguide/troubleshooting-workflows.html) in the *Amazon CodeCatalyst User Guide*.

## Additional resources
<!-- Add links to other places in your docs, as required. -->

- [custom-action definition reference](https://www.mycompany.com/docs/ACTIONNAME-action-yaml) - Describes all **custom-action** action properties in detail.
- [Workflow definition reference](https://www.mycompany.com/docs/ACTIONNAME-workflow-yaml) - Describes all available workflow definition file properties in detail.
- [Tutorial](https://www.mycompany.com/docs/ACTIONNAME-action-tut) - Step-by-step instructions on getting the **custom-action** action running in an example scenario.
- [Provide feedback](www.mycompany.com/feedback) - Submit a ticket against this action.

